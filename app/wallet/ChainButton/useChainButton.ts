import { useWallet } from 'app/wallet'

export function useChainButton() {
  const {
    status,
    network,
    chainDialog: { open },
  } = useWallet()

  return { network, status, open }
}
