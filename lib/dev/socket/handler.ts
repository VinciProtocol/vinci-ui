import type { NextApiRequest } from 'next'
import { Server as ServerIO } from 'socket.io'
import type { Server as NetServer } from 'http'
import type { NextApiResponseDev } from 'app/types/next'

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponseDev) => {
  if (!res.socket.server.io) {
    console.log('Socket.io init')
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path: '/api/socket',
    })
    res.socket.server.io = io
  }
  res.end()
}

export default handler
