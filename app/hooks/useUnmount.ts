/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useLatest } from '@vinci-protocol/hooks'

export const useUnmount = (unmount: () => void) => {
  const unmountRef = useLatest(unmount)

  useEffect(
    () => () => {
      unmountRef.current()
    },
    []
  )
}
