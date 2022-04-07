import { useEffect } from 'react'
import { useWallet } from 'app/wallet'

type ChainIDChangeProps = {
  controllers: Array<{
    clearData: () => void
    restart: () => void
  }>
}

export const useChainIDChange = (props: ChainIDChangeProps) => {
  const { chainId } = useWallet()
  useEffect(() => {
    console.log('on chainID change', chainId)
    props.controllers.forEach((controller) => {
      controller.clearData()
      controller.restart()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId])
}
