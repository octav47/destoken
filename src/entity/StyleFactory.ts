import { Node } from './Node';
import {
  FontFamilyStyle,
  LineHeightStyle,
  Style,
  StyleProps,
  TextDecorationStyle,
  DimensionStyle,
  Type,
  TextCaseStyle,
  ParagraphSpacingStyle,
  FontSizeStyle,
  LetterSpacingStyle,
  FontWeightStyle,
  BorderRadiusStyle,
  TypographyStyle,
  SizingStyle,
  ColorStyle,
} from './Style';

export class StyleFactory {
  static fromNode(node: Node): Style {
    const { key, type, originKey, value } = node;
    const styleProps: StyleProps = {
      key: node.key,
      type: node.type,
      value: node.value,
    };

    if (!type) {
      return null;
    }

    if (type === Type.fontFamilies) {
      return new FontFamilyStyle(styleProps);
    }

    if (type === Type.textDecoration) {
      return new TextDecorationStyle(styleProps);
    }

    if (type === Type.lineHeights) {
      return new LineHeightStyle(styleProps);
    }

    if (type === Type.dimension) {
      return new DimensionStyle(styleProps);
    }

    if (type === Type.textCase) {
      return new TextCaseStyle(styleProps);
    }

    if (type === Type.paragraphSpacing) {
      return new ParagraphSpacingStyle(styleProps);
    }

    if (type === Type.fontSizes) {
      return new FontSizeStyle(styleProps);
    }

    if (type === Type.letterSpacing) {
      return new LetterSpacingStyle(styleProps);
    }

    if (type === Type.fontWeights) {
      return new FontWeightStyle(styleProps);
    }

    if (type === Type.borderRadius) {
      return new BorderRadiusStyle(styleProps);
    }

    if (type === Type.typography) {
      return new TypographyStyle(styleProps);
    }

    if (type === Type.sizing) {
      return new SizingStyle(styleProps);
    }

    if (type === Type.color) {
      const style = new ColorStyle(styleProps);

      style.key = originKey;

      if (key.indexOf('font-color') > -1) {
        return style.setCssVarName('color');
      }

      if (key.indexOf('background-color') > -1) {
        return style.setCssVarName('background-color');
      }
    }

    console.warn('unknown node', node);

    return null;
  }
}
