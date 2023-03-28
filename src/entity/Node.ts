export interface NodeProps {
  key: string;
  originKey: string;
  type?: string;
  value?: string;
  children?: Node[];
}

export class Node {
  children: Node[];
  key: string;
  originKey: string;
  value: string;
  type: any;

  constructor({ key, originKey, type, value, children }: NodeProps) {
    this.key = key;
    this.originKey = originKey;
    this.type = type;
    this.value = value;
    this.children = children;
  }

  dfs(cb: (n: Node) => void | Node): void | Node {
    const r = cb(this);

    if (r !== undefined) {
      return r;
    }

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];

      const r = child.dfs(cb);

      if (r !== undefined) {
        return r;
      }
    }
  }

  findByValue(value: string): Node | null {
    const [type] = value.replace(/[{}]/g, '').split('.');

    const r = this.dfs((n) => {
      if (n.type === type) {
        return n;
      }
    });

    return r || null;
  }

  static fromJSON(
    json: { [key: string]: any },
    key = '',
    originKey = ''
  ): Node {
    const node = new Node({
      key,
      originKey,
      type: json.type,
      value: json.value,
      children: [],
    });

    Object.keys(json).forEach((k) => {
      const childJSON = json[k];

      if (childJSON.type) {
        node.children.push(
          new Node({
            type: childJSON.type,
            key: [key, k].filter((e) => e).join('_'),
            originKey: k,
            value: childJSON.value,
            children: [],
          })
        );
      } else {
        node.children.push(
          Node.fromJSON(childJSON, [key, k].filter((e) => e).join('_'), k)
        );
      }
    });

    return node;
  }
}
