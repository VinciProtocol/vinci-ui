import { createContext } from 'utils/createContext'

import { useFormat } from './format'
import { usePages } from './pages'

export function useAppService() {
  const format = useFormat()
  const pages = usePages()

  return {
    format,
    pages,
  }
}

export const { Context, Provider: APP, createUseContext } = createContext(useAppService)
export const useApp = createUseContext()
export default APP
