declare const __SERVER__: boolean
declare const __DEV__: boolean

declare interface Window {
  ethereum: {
    /**
     * Hex
     */
    chainId: string

    on: (key: 'chainChanged', fn: (...args: any[]) => void) => void
    removeListener: (key: 'chainChanged', fn: (...args: any[]) => void) => void
  }
}
