import { transpileModule } from 'typescript'
import fs from 'fs'

export const requireTsSource = (source: string) => {
  return eval(
    transpileModule(source, {
      compilerOptions: {},
    }).outputText
  )
}

export const requireFromPath = (path: string) => {
  let source = fs.readFileSync(path, { encoding: 'utf-8' })
  if (path.endsWith('.json')) {
    source = 'module.exports = ' + source
  }
  return requireTsSource(source)
}
