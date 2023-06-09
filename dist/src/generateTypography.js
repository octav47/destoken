const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const prettierConfig = require('../../.prettierrc.js');
const tokenStylesJson = require('./typography.json');
const components = ['Header', 'Body', 'Caption'];
class Style {
    constructor({ key, value, type }) {
        this.SHOULD_BE_IMPLEMENTED = 'should be implemented in child class';
        this.key = key;
        this.value = value;
        this.type = type;
        this.cssVarName = this.key;
    }
    isPrimitive() {
        return false;
    }
    getValidValue() {
        return null;
    }
    keyToVariable(prefix = '') {
        return `${prefix}${`-${this.cssVarName}-${this.key}`.replace(/-(.)/g, (v) => v.replace(/-/g, '').toUpperCase())}`;
    }
    toTS() {
        throw this.SHOULD_BE_IMPLEMENTED;
    }
    toObjectStyle() {
        throw this.SHOULD_BE_IMPLEMENTED;
    }
}
class PrimitiveStyle extends Style {
    constructor() {
        super(...arguments);
        this.valueDimension = '';
    }
    isPrimitive() {
        return true;
    }
    getValidName() {
        return this.cssVarName;
    }
    getValidValue() {
        return `${this.value}${this.valueDimension}`;
    }
    toTS() {
        return `export const ${this.keyToVariable('style')} = '${this.type}: var(--${this.key});';`;
    }
    toObjectStyle() {
        const style = {
            [this.cssVarName]: `${this.getValidValue()}`,
        };
        const varName = `${this.cssVarName}-${this.key}`.replace(/-/g, '_');
        return `export const ${varName} = ${JSON.stringify(style)};`;
    }
}
class LineHeightStyle extends PrimitiveStyle {
    constructor() {
        super(...arguments);
        this.cssVarName = 'line-height';
        this.valueDimension = 'px';
    }
}
class FontSizeStyle extends PrimitiveStyle {
    constructor() {
        super(...arguments);
        this.cssVarName = 'font-size';
        this.valueDimension = 'px';
    }
}
class LetterSpacingStyle extends PrimitiveStyle {
    constructor() {
        super(...arguments);
        this.cssVarName = 'letter-spacing';
        this.valueDimension = '';
    }
    getValidValue() {
        return this.value.replace(/%/g, '');
    }
}
class FontFamilyStyle extends PrimitiveStyle {
    constructor() {
        super(...arguments);
        this.cssVarName = 'font-family';
    }
    getValidValue() {
        return `${super.getValidValue()}, sans-serif`;
    }
}
class FontWeightStyle extends PrimitiveStyle {
    constructor() {
        super(...arguments);
        this.cssVarName = 'font-weight';
    }
    getValidValue() {
        const value = this.value.toLowerCase();
        switch (value) {
            case 'regular':
                return '400';
            case 'bold':
                return '700';
            default:
                return '400';
        }
    }
}
class ParagraphSpacing extends PrimitiveStyle {
    constructor() {
        super(...arguments);
        this.cssVarName = 'padding-bottom';
        this.valueDimension = 'px';
    }
}
class TextTransformStyle extends PrimitiveStyle {
    constructor() {
        super(...arguments);
        this.cssVarName = 'text-transform';
    }
}
const getPropValue = (name, obj) => {
    const keys = obj.value.replace(/[{}]/g, '').split('.');
    const value = keys.reduce((prev, key) => {
        return prev[key];
    }, tokenStylesJson.global);
    // console.log(obj, keys, value);
    const props = Object.assign(Object.assign({}, obj), value);
    switch (obj.type) {
        case 'fontFamilies':
            return new FontFamilyStyle(props);
        case 'fontWeights':
            return new FontWeightStyle(props);
        case 'lineHeight':
            return new LineHeightStyle(props);
        case 'fontSizes':
            return new FontSizeStyle(props);
        case 'letterSpacing':
            return new LetterSpacingStyle(props);
        case 'paragraphSpacing':
            return new ParagraphSpacing(props);
        case 'textCase':
            return new TextTransformStyle(props);
        default:
            return null;
    }
};
const run = () => {
    const OUTPUT_PATH = path.resolve(__dirname, 'sharedStyles', 'typography.ts');
    const { global } = tokenStylesJson;
    const parsedComponents = {};
    components.forEach((component) => {
        const tagStyles = global[component];
        Object.keys(tagStyles).forEach((tag) => {
            const tagStyle = tagStyles[tag];
            parsedComponents[tag] = Object.keys(tagStyle).reduce((prev, propName) => {
                const propValue = getPropValue(propName, tagStyle[propName]);
                if (propValue === null) {
                    console.log(`Unknown ${propName}`);
                }
                else {
                    prev[propName] = propValue;
                }
                return prev;
            }, {});
        });
    });
    const output = `/*
  This file is autogenerated, but should be committed
  Check READme.md
*/

${Object.keys(parsedComponents)
        .map((tagName) => {
        const preparedTagName = tagName.replace(/-/g, '_');
        const preparedStyles = Object.keys(parsedComponents[tagName]).reduce((prev, key) => {
            const style = parsedComponents[tagName][key];
            prev[style.getValidName()] = style.getValidValue();
            return prev;
        }, {});
        return `export const ${preparedTagName} = ${JSON.stringify(preparedStyles)};`;
    })
        .join('')}
`;
    fs.writeFileSync(OUTPUT_PATH, prettier.format(output, Object.assign(Object.assign({}, prettierConfig), { parser: 'babel-ts' })), 'utf-8');
};
run();
