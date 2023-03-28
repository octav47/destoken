import { Parser } from './entity/Parser';
import * as path from 'path';
import { Node } from './entity/Node';
import { Generator } from './entity/Generator';
import { StyleFactory } from './entity/StyleFactory';
import { Style } from './entity/Style';

export interface Options {
  rootPath: string;
  from: string;
  to: string;
}

export const run = ({ rootPath, from, to }: Options) => {
  const parser = new Parser();
  const generator = new Generator({
    output: path.resolve(rootPath, to),
  });

  const tokenJson = parser.read(path.resolve(rootPath, from));

  const rootNode = Node.fromJSON(tokenJson.global);

  // console.log(rootNode.findByValue('{fontFamilies.als-hauss}'));

  const styles: Style[] = [];

  rootNode.dfs((e: Node) => {
    // console.log(e);

    styles.push(StyleFactory.fromNode(e));
  });

  generator.createStyles(
    styles.filter((e) => e),
    rootNode
  );
};
