import { useState, useCallback } from 'react'

export function useConnectDialog() {
  const [visible, setVisible] = useState(false)

  const open = useCallback(() => {
    setVisible(true)
  }, [setVisible])

  const close = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  return { visible, open, close }
}
