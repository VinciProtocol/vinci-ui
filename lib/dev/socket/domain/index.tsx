import { useEffect, useState } from 'react'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import type { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { createContext } from 'utils/createContext'

const useSocketService = () => {
  const [connected, setConnected] = useState<boolean>(false)
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>()

  useEffect((): any => {
    const socketIO = io('/', {
      path: '/api/socket',
    })

    socketIO.on('connect', () => {
      ;(window as any).socketIO = socketIO
      console.log('update window.socketIO, socket connected', socketIO.id)
      setConnected(true)
    })

    socketIO.on('message', (...args) => {
      console.log('[send]', ...args)
    })

    setSocket(socketIO)

    if (socketIO) return () => socketIO.disconnect()
  }, [])

  return {
    socket,
    connected,
  }
}
const { Provider: SocketProvider, createUseContext } = createContext(useSocketService)
export const useSocket = createUseContext()

export default SocketProvider
