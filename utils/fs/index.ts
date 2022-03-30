import path from 'path'
import fs from 'fs'
import fsPromises from 'fs/promises'

export function ensureFolderExistence(filePath: string) {
  const extname = path.extname(filePath)
  const dirname = !extname ? filePath : path.dirname(filePath)
  if (fs.existsSync(dirname)) return filePath
  fs.mkdirSync(dirname, { recursive: true })
  return filePath
}

export function writeFile(path: string, source: string) {
  return fsPromises.writeFile(ensureFolderExistence(path), JSON.stringify(source, null, 2))
}
