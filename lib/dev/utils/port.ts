import net from 'net'
import { exec } from 'child_process'
import { createPromise } from 'utils/promise'

/**
 * 检测端口是否被占用
 * - kill 强制关闭被占用的端口号
 */
export const portIsOccupied = (port: number, kill?: boolean) => {
  const { promise, reslove, reject } = createPromise()
  let server = net.createServer().listen(port)

  server.on('listening', function () {
    server.close()
    reslove()
  })

  server.on('error', function () {
    if (!kill) return reject()
    exec(`lsof -i :${port}`, function (err, stdout) {
      if (err) return console.log(err)
      stdout.split('\n').filter(function (line) {
        let p = line.trim().split(/\s+/)
        let address = p[1]
        if (address != undefined && address != 'PID') {
          exec('kill ' + address, function (err) {
            if (err) return reject()
            console.log('kill 3', port, address)
            reslove()
          })
        }
      })
    })
  })

  return promise
}
