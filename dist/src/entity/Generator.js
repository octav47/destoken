"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const fs = __importStar(require("fs"));
const prettier_1 = __importDefault(require("prettier"));
const prettier_config_1 = __importDefault(require("../../prettier.config"));
class Generator {
    constructor({ output }) {
        this.output = output;
    }
    createStyles(styles, rootNode) {
        const primitives = styles.filter((s) => s.isPrimitive());
        const complex = styles
            .filter((s) => !s.isPrimitive())
            .map((style) => style.setRootNode(rootNode));
        const data = `
        // primitives
        ${primitives
            .map((style) => {
            return style.toTS();
        })
            .join('\n\n;')}
        
        // complex
        ${complex
            .map((style) => {
            return style.toTS();
        })
            .join('\n\n;')}
    `;
        const prettierOptions = Object.assign(Object.assign({}, prettier_config_1.default), { parser: 'babel-ts' });
        fs.writeFileSync(this.output, 
        // @ts-ignore
        prettier_1.default.format(data, prettierOptions), 'utf-8');
    }
}
exports.Generator = Generator;
