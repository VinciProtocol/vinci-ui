const BASE_URL = 'https://storageapi.fleek.co/aragonone-team-bucket/wallet-icons'

export const unknownProvider = {
  name: 'Unknown',
  type: 'Any',
  image: `${BASE_URL}/wallet.svg`,
  strings: {
    wallet: 'your wallet',
  },
}

export const providers = {
  // frame: {
  //   name: 'Frame',
  //   type: 'Desktop',
  //   image: `${BASE_URL}/Frame.png`,
  //   strings: {
  //     wallet: 'Frame',
  //   },
  // },
  metamask: {
    name: 'Metamask',
    type: 'Desktop',
    image: `${BASE_URL}/Metamask.png`,
    strings: {
      wallet: 'Metamask',
    },
  },
  // status: {
  //   name: 'Status',
  //   type: 'Mobile',
  //   image: `${BASE_URL}/Status.png`,
  //   strings: {
  //     wallet: 'Status',
  //   },
  // },
  // cipher: {
  //   name: 'Cipher',
  //   type: 'Mobile',
  //   image: `${BASE_URL}/Cipher.png`,
  //   strings: {
  //     wallet: 'Cipher',
  //   },
  // },
  // fortmatic: {
  //   name: 'Fortmatic',
  //   type: 'Any',
  //   image: `${BASE_URL}/Fortmatic.svg`,
  //   strings: {
  //     wallet: 'Fortmatic',
  //   },
  // },
  // portis: {
  //   name: 'Portis',
  //   type: 'Any',
  //   image: `${BASE_URL}/Portis.svg`,
  //   strings: {
  //     wallet: 'Portis',
  //   },
  // },
  walletconnect: {
    name: 'WalletConnect',
    type: 'Any',
    image: `${BASE_URL}/walletconnect.png`,
    strings: {
      wallet: 'WalletConnect',
    },
  },
  injected: unknownProvider,
  // provided: unknownProvider,
  unknown: unknownProvider,
}

export type Providers = typeof providers
