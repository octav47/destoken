import { Style } from './Style'

export interface NodeProps {
  key: string
  children?: Node[]
}

export class Node {
  children: Node[]
  key: string
  value: string
  type: any

  constructor({ key, children }: NodeProps) {
    this.key = key
    this.children = children
  }

  dfs(cb: any) {
    cb(this)

    this.children.forEach((child) => {
      child.dfs(cb)
    })
  }

  static fromJSON(json: { [key: string]: any }, key = ''): Node {
    const node = new Node({ key, children: [] })

    Object.keys(json).forEach((k) => {
      const childJSON = json[k]

      if (childJSON.type) {
      } else {
        node.children.push(
          Node.fromJSON(childJSON, [key, k].filter((e) => e).join('_'))
        )
      }
    })

    return node
  }
}
