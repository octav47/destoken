"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorStyle = exports.SizingStyle = exports.TypographyStyle = exports.BorderRadiusStyle = exports.FontWeightStyle = exports.LetterSpacingStyle = exports.FontSizeStyle = exports.ParagraphSpacingStyle = exports.TextCaseStyle = exports.DimensionStyle = exports.LineHeightStyle = exports.TextDecorationStyle = exports.FontFamilyStyle = exports.ComplexStyle = exports.Style = exports.Type = void 0;
const StyleFactory_1 = require("./StyleFactory");
var Type;
(function (Type) {
    Type["fontFamilies"] = "fontFamilies";
    Type["textDecoration"] = "textDecoration";
    Type["lineHeights"] = "lineHeights";
    Type["dimension"] = "dimension";
    Type["textCase"] = "textCase";
    Type["paragraphSpacing"] = "paragraphSpacing";
    Type["fontSizes"] = "fontSizes";
    Type["letterSpacing"] = "letterSpacing";
    Type["fontWeights"] = "fontWeights";
    Type["borderRadius"] = "borderRadius";
    Type["typography"] = "typography";
    Type["sizing"] = "sizing";
    Type["color"] = "color";
})(Type = exports.Type || (exports.Type = {}));
class Style {
    constructor({ key, value, type }) {
        this.valueDimension = '';
        this.key = key;
        this.value = value;
        this.type = type;
        this.cssVarName = this.key;
    }
    isPrimitive() {
        return true;
    }
    setCssVarName(cssVarName) {
        this.cssVarName = cssVarName;
        return this;
    }
    getValidValue() {
        return `${this.value}${this.valueDimension}`;
    }
    toTS() {
        return `export const ${this.getVarName()} = ${JSON.stringify(this.toObjectStyle())}`;
    }
    toObjectStyle() {
        return { [this.cssVarName]: this.getValidValue() };
    }
    getVarName() {
        return this.key.replace(/-/g, '_');
    }
    keyToVariable(prefix = '') {
        return `${prefix}${`-${this.cssVarName}-${this.key}`.replace(/-(.)/g, (v) => v.replace(/-/g, '').toUpperCase())}`;
    }
}
exports.Style = Style;
class ComplexStyle extends Style {
    constructor(props) {
        super(Object.assign(Object.assign({}, props), { value: undefined }));
        this.value = props.value;
    }
    isPrimitive() {
        return false;
    }
    setRootNode(rootNode) {
        this.rootNode = rootNode;
        return this;
    }
    toObjectStyle() {
        return {};
    }
    toTS() {
        const values = Object.keys(this.value)
            .map((valueName) => {
            const value = this.value[valueName];
            const node = this.rootNode.findByValue(value);
            return node ? StyleFactory_1.StyleFactory.fromNode(node) : null;
        })
            .filter((e) => e);
        return `export const ${this.getVarName()} = ${JSON.stringify(values.reduce((prev, e) => {
            return Object.assign(Object.assign({}, prev), e.toObjectStyle());
        }, {}))};`;
    }
}
exports.ComplexStyle = ComplexStyle;
class FontFamilyStyle extends Style {
    constructor() {
        super(...arguments);
        this.cssVarName = 'font-family';
        this.valueDimension = ', sans-serif';
    }
}
exports.FontFamilyStyle = FontFamilyStyle;
class TextDecorationStyle extends Style {
    constructor() {
        super(...arguments);
        this.cssVarName = 'text-decoration';
    }
}
exports.TextDecorationStyle = TextDecorationStyle;
class LineHeightStyle extends Style {
    constructor() {
        super(...arguments);
        this.cssVarName = 'line-height';
        this.valueDimension = 'px';
    }
}
exports.LineHeightStyle = LineHeightStyle;
class DimensionStyle extends Style {
    constructor() {
        super(...arguments);
        this.cssVarName = 'text-indent';
    }
}
exports.DimensionStyle = DimensionStyle;
class TextCaseStyle extends Style {
    constructor() {
        super(...arguments);
        this.cssVarName = 'text-transform';
    }
}
exports.TextCaseStyle = TextCaseStyle;
class ParagraphSpacingStyle extends Style {
    constructor() {
        super(...arguments);
        this.cssVarName = 'margin-bottom';
        this.valueDimension = 'px';
    }
}
exports.ParagraphSpacingStyle = ParagraphSpacingStyle;
class FontSizeStyle extends Style {
    constructor() {
        super(...arguments);
        this.cssVarName = 'font-size';
        this.valueDimension = 'px';
    }
}
exports.FontSizeStyle = FontSizeStyle;
class LetterSpacingStyle extends Style {
    constructor() {
        super(...arguments);
        this.cssVarName = 'letter-spacing';
    }
}
exports.LetterSpacingStyle = LetterSpacingStyle;
class FontWeightStyle extends Style {
    constructor(props) {
        super(props);
        this.cssVarName = 'font-weight';
        let value;
        switch (this.value) {
            case 'Regular':
                value = 'normal';
                break;
            case 'Bold':
                value = 'bold';
                break;
            default:
                value = 'normal';
        }
        this.value = value;
    }
}
exports.FontWeightStyle = FontWeightStyle;
class BorderRadiusStyle extends Style {
    constructor() {
        super(...arguments);
        this.cssVarName = 'border-radius';
        this.valueDimension = 'px';
    }
}
exports.BorderRadiusStyle = BorderRadiusStyle;
class TypographyStyle extends ComplexStyle {
}
exports.TypographyStyle = TypographyStyle;
class SizingStyle extends Style {
    constructor() {
        super(...arguments);
        this.cssVarName = 'sizing';
        this.valueDimension = 'px';
    }
    toObjectStyle() {
        return { value: `${this.value}${this.valueDimension}` };
    }
}
exports.SizingStyle = SizingStyle;
class ColorStyle extends Style {
}
exports.ColorStyle = ColorStyle;
