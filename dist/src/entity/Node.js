"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
class Node {
    constructor({ key, originKey, type, value, children }) {
        this.key = key;
        this.originKey = originKey;
        this.type = type;
        this.value = value;
        this.children = children;
    }
    dfs(cb) {
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
    findByValue(value) {
        const [type] = value.replace(/[{}]/g, '').split('.');
        const r = this.dfs((n) => {
            if (n.type === type) {
                return n;
            }
        });
        return r || null;
    }
    static fromJSON(json, key = '', originKey = '') {
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
                node.children.push(new Node({
                    type: childJSON.type,
                    key: [key, k].filter((e) => e).join('_'),
                    originKey: k,
                    value: childJSON.value,
                    children: [],
                }));
            }
            else {
                node.children.push(Node.fromJSON(childJSON, [key, k].filter((e) => e).join('_'), k));
            }
        });
        return node;
    }
}
exports.Node = Node;
