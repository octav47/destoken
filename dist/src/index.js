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
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const Parser_1 = require("./entity/Parser");
const path = __importStar(require("path"));
const Node_1 = require("./entity/Node");
const Generator_1 = require("./entity/Generator");
const StyleFactory_1 = require("./entity/StyleFactory");
const run = ({ rootPath }) => {
    const parser = new Parser_1.Parser();
    const generator = new Generator_1.Generator({
        output: path.resolve(rootPath, 'test/typography.ts'),
    });
    const tokenJson = parser.read(path.resolve(rootPath, 'test/typography.json'));
    const rootNode = Node_1.Node.fromJSON(tokenJson.global);
    // console.log(rootNode.findByValue('{fontFamilies.als-hauss}'));
    const styles = [];
    rootNode.dfs((e) => {
        // console.log(e);
        styles.push(StyleFactory_1.StyleFactory.fromNode(e));
    });
    generator.createStyles(styles.filter((e) => e), rootNode);
};
exports.run = run;
