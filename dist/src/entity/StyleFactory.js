"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleFactory = void 0;
const Style_1 = require("./Style");
class StyleFactory {
    static fromNode(node) {
        const { key, type, originKey, value } = node;
        const styleProps = {
            key: node.key,
            type: node.type,
            value: node.value,
        };
        if (!type) {
            return null;
        }
        if (type === Style_1.Type.fontFamilies) {
            return new Style_1.FontFamilyStyle(styleProps);
        }
        if (type === Style_1.Type.textDecoration) {
            return new Style_1.TextDecorationStyle(styleProps);
        }
        if (type === Style_1.Type.lineHeights) {
            return new Style_1.LineHeightStyle(styleProps);
        }
        if (type === Style_1.Type.dimension) {
            return new Style_1.DimensionStyle(styleProps);
        }
        if (type === Style_1.Type.textCase) {
            return new Style_1.TextCaseStyle(styleProps);
        }
        if (type === Style_1.Type.paragraphSpacing) {
            return new Style_1.ParagraphSpacingStyle(styleProps);
        }
        if (type === Style_1.Type.fontSizes) {
            return new Style_1.FontSizeStyle(styleProps);
        }
        if (type === Style_1.Type.letterSpacing) {
            return new Style_1.LetterSpacingStyle(styleProps);
        }
        if (type === Style_1.Type.fontWeights) {
            return new Style_1.FontWeightStyle(styleProps);
        }
        if (type === Style_1.Type.borderRadius) {
            return new Style_1.BorderRadiusStyle(styleProps);
        }
        if (type === Style_1.Type.typography) {
            return new Style_1.TypographyStyle(styleProps);
        }
        if (type === Style_1.Type.sizing) {
            return new Style_1.SizingStyle(styleProps);
        }
        if (type === Style_1.Type.color) {
            const style = new Style_1.ColorStyle(styleProps);
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
exports.StyleFactory = StyleFactory;
