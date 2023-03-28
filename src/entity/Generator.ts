import * as fs from 'fs';
import prettier from 'prettier';
import prettierConfig from '../../prettier.config';
import { ComplexStyle, Style } from './Style';
import { Node } from './Node';

export interface GeneratorProps {
  output: string;
}

export class Generator {
  output: string;

  constructor({ output }: GeneratorProps) {
    this.output = output;
  }

  createStyles(styles: Style[], rootNode: Node) {
    const primitives = styles.filter((s) => s.isPrimitive());
    const complex = styles
      .filter((s) => !s.isPrimitive())
      .map((style) => (style as ComplexStyle).setRootNode(rootNode));

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

    const prettierOptions = {
      ...prettierConfig,
      parser: 'babel-ts',
    };

    fs.writeFileSync(
      this.output,
      // @ts-ignore
      prettier.format(data, prettierOptions),
      'utf-8'
    );
  }
}
