import * as fs from 'fs'

export class Parser {
  constructor() {
    console.log('parser init')
  }

  read(path: string) {
    const data = fs.readFileSync(path, 'utf-8')

    return JSON.parse(data)
  }
}
