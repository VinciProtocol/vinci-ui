import { spawn } from 'child_process'
import path from 'path'

const ROOT_PATH = process.cwd()

export const PROTOCOL_PATH = path.resolve(ROOT_PATH, 'lib/protocol/src2')

export const run = async () => {
  spawn('npx', ['hardhat', 'console'], {
    stdio: 'inherit',
    cwd: PROTOCOL_PATH,
  })
}
