import { useWallet } from 'app/wallet'

export function useConnectButton() {
  const {
    status,
    error,
    connectDialog: { open },
  } = useWallet()

  return { status, open, error }
}
