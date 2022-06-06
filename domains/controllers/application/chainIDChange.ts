import { useEffect } from 'react'
import { useWallet } from 'app/wallet'

type ClearData = {
  clearData: () => void
  restart: () => void
}
type ChainIDChangeProps = {
  controllers: ClearData[]
  ObjectControllers: Record<string, ClearData>[]
}

export const useChainIDChange = ({ controllers, ObjectControllers }: ChainIDChangeProps) => {
  const { chainId } = useWallet()
  useEffect(() => {
    console.log('on chainID change', chainId)
    controllers.forEach((controller) => {
      controller.clearData()
      controller.restart()
    })
    ObjectControllers.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        const controller = obj[key]
        controller.clearData()
        controller.restart()
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId])
}
