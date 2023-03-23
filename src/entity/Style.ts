export interface IStyle {
  key: string
  value: string
  type: string
  cssVarName: string

  isPrimitive: () => boolean
  getValidValue: () => any
  keyToVariable: (prefix: string) => string
}

export type StyleProps = Pick<IStyle, 'key' | 'value' | 'type'>

export class Style {
  key
  value
  type
  cssVarName

  constructor({ key, value, type }: StyleProps) {
    this.key = key
    this.value = value
    this.type = type
    this.cssVarName = this.key
  }

  isPrimitive(): boolean {
    return false
  }
  getValidValue(): any {}
  toTS(): void {}
  toObjectStyle(): void {}

  keyToVariable(prefix = '') {
    return `${prefix}${`-${this.cssVarName}-${this.key}`.replace(/-(.)/g, (v) =>
      v.replace(/-/g, '').toUpperCase()
    )}`
  }
}
