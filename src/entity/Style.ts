import { Node } from './Node';
import { StyleFactory } from './StyleFactory';

export interface IStyle {
  key: string;
  value: string;
  type: string;
  cssVarName: string;

  isPrimitive: () => boolean;
  getValidValue: () => any;
  keyToVariable: (prefix: string) => string;
}

export interface StyleProps {
  key: string;
  value: any;
  type: string;
}

export enum Type {
  fontFamilies = 'fontFamilies',
  textDecoration = 'textDecoration',
  lineHeights = 'lineHeights',
  dimension = 'dimension',
  textCase = 'textCase',
  paragraphSpacing = 'paragraphSpacing',
  fontSizes = 'fontSizes',
  letterSpacing = 'letterSpacing',
  fontWeights = 'fontWeights',
  borderRadius = 'borderRadius',
  typography = 'typography',
  sizing = 'sizing',
  color = 'color',
}

export class Style<V = string> {
  key;
  value;
  type;
  cssVarName;
  valueDimension = '';

  constructor({ key, value, type }: StyleProps) {
    this.key = key;
    this.value = value;
    this.type = type;
    this.cssVarName = this.key;
  }

  isPrimitive(): boolean {
    return true;
  }

  setCssVarName(cssVarName: string): Style {
    this.cssVarName = cssVarName;

    return this;
  }

  getValidValue(): any {
    return `${this.value}${this.valueDimension}`;
  }

  toTS() {
    return `export const ${this.getVarName()} = ${JSON.stringify(
      this.toObjectStyle()
    )}`;
  }

  toObjectStyle() {
    return { [this.cssVarName]: this.getValidValue() };
  }

  getVarName(): string {
    return this.key.replace(/-/g, '_');
  }

  keyToVariable(prefix = '') {
    return `${prefix}${`-${this.cssVarName}-${this.key}`.replace(/-(.)/g, (v) =>
      v.replace(/-/g, '').toUpperCase()
    )}`;
  }
}

export class ComplexStyle extends Style {
  rootNode: Node;

  constructor(props: StyleProps) {
    super({ ...props, value: undefined });

    this.value = props.value;
  }

  isPrimitive(): boolean {
    return false;
  }

  setRootNode(rootNode: Node): ComplexStyle {
    this.rootNode = rootNode;

    return this;
  }

  toObjectStyle(): { [p: string]: any } {
    return {};
  }

  toTS(): string {
    const values = Object.keys(this.value)
      .map((valueName) => {
        const value: string = this.value[valueName];

        const node = this.rootNode.findByValue(value);

        return node ? StyleFactory.fromNode(node) : null;
      })
      .filter((e) => e);

    return `export const ${this.getVarName()} = ${JSON.stringify(
      values.reduce((prev, e) => {
        return {
          ...prev,
          ...e.toObjectStyle(),
        };
      }, {})
    )};`;
  }
}

export class FontFamilyStyle extends Style {
  cssVarName = 'font-family';
  valueDimension = ', sans-serif';
}

export class TextDecorationStyle extends Style {
  cssVarName = 'text-decoration';
}

export class LineHeightStyle extends Style {
  cssVarName = 'line-height';
  valueDimension = 'px';
}

export class DimensionStyle extends Style {
  cssVarName = 'text-indent';
}

export class TextCaseStyle extends Style {
  cssVarName = 'text-transform';
}

export class ParagraphSpacingStyle extends Style {
  cssVarName = 'margin-bottom';
  valueDimension = 'px';
}

export class FontSizeStyle extends Style {
  cssVarName = 'font-size';
  valueDimension = 'px';
}

export class LetterSpacingStyle extends Style {
  cssVarName = 'letter-spacing';
}

export class FontWeightStyle extends Style {
  cssVarName = 'font-weight';

  constructor(props: StyleProps) {
    super(props);

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

export class BorderRadiusStyle extends Style {
  cssVarName = 'border-radius';
  valueDimension = 'px';
}

export class TypographyStyle extends ComplexStyle {}

export class SizingStyle extends Style {
  cssVarName = 'sizing';
  valueDimension = 'px';

  toObjectStyle(): { [p: string]: any } {
    return { value: `${this.value}${this.valueDimension}` };
  }
}

export class ColorStyle extends Style {}
