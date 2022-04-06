import { useNumberFormat } from 'utils/math/hooks/useNumberFormat'

export const useFormat = () => {
  const number = useNumberFormat()

  return {
    number,
  }
}
