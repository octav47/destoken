import { Parser } from './entity/Parser'
import * as path from 'path'
import { Node } from './entity/Node'

export const run = () => {
  const parser = new Parser()

  const tokenJson = parser.read(
    path.resolve(__dirname, '../test/typography.json')
  )

  const rootNode = Node.fromJSON(tokenJson)

  rootNode.dfs((e: any) => {
    console.log(e)
  })
}
