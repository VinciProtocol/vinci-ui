import icons from './images/icons'
import aIcons from './images/aIcons'

export interface Asset {
  name: string
  symbol: string
  formattedSymbol?: string
  color?: string
  icon?: any
  aIcon?: any
  symbolFormatted?: string
  symbolsArray?: string[]
  formattedName?: string
  shortSymbol?: string
}

export const assetsList: Asset[] = [
  {
    name: 'Aave',
    symbol: 'AAVE',
    color: '#b6509e',
    icon: icons.aave,
    aIcon: aIcons.aaave,
  },
  {
    name: 'Stake Aave',
    symbol: 'STKAAVE',
    color: '#b6509e',
    icon: icons.stkaave,
    aIcon: aIcons.astkaave,
  },
  {
    name: 'Basic Attention Token',
    symbol: 'BAT',
    color: '#662d91',
    icon: icons.bat,
    aIcon: aIcons.abat,
  },
  {
    name: 'Binance USD',
    symbol: 'BUSD',
    color: '#f0b90b',
    icon: icons.busd,
    aIcon: aIcons.abusd,
  },
  {
    name: 'DAI',
    symbol: 'DAI',
    color: '#f7b14a',
    icon: icons.dai,
    aIcon: aIcons.adai,
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    color: '#000000',
    icon: icons.eth,
    aIcon: aIcons.aeth,
  },
  {
    name: 'ETHLend',
    symbol: 'LEND',
    color: '#b6509e',
    icon: icons.lend,
    aIcon: aIcons.alend,
  },
  {
    name: 'ETHLend',
    symbol: 'ALEND',
    color: '#b6509e',
    icon: icons.alend,
  },
  {
    name: 'ChainLink',
    symbol: 'LINK',
    color: '#2463ff',
    icon: icons.link,
    aIcon: aIcons.alink,
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    color: '#2775ca',
    icon: icons.usdc,
    aIcon: aIcons.ausdc,
  },
  {
    name: 'USDT Coin',
    symbol: 'USDT',
    color: '#4db196',
    icon: icons.usdt,
    aIcon: aIcons.ausdt,
  },
  {
    name: 'WBTC Coin',
    symbol: 'WBTC',
    color: '#ff7600',
    icon: icons.wbtc,
    aIcon: aIcons.awbtc,
  },
  {
    name: 'BNB',
    symbol: 'BNB',
    color: '#f0b90b',
    icon: aIcons.bnb,
    aIcon: aIcons.bnb,
  },
  {
    name: 'WBNB',
    symbol: 'WBNB',
    color: '#f0b90b',
    icon: aIcons.bnb,
    aIcon: aIcons.bnb,
  },
]

export const getAssetInfoFactory =
  (_assetsList: Asset[]) =>
  (_assetSymbol: string): Asset => {
    const assetSymbol = _assetSymbol.toUpperCase()
    const asset = _assetsList.find((asset: Asset) => asset.symbol === assetSymbol)
    const symbolFormatted = (asset && asset.formattedSymbol) || (asset && asset.symbol)
    const symbolsArray = symbolFormatted?.split('_').filter((e) => String(e).trim())

    const isSymbolsArrayMoreThanOne = !!symbolsArray && symbolsArray.length > 1
    const formattedName = isSymbolsArrayMoreThanOne ? asset && asset.name : symbolFormatted

    if (asset) {
      return {
        ...asset,
        symbolFormatted,
        symbolsArray,
        formattedName,
      }
    }

    return {
      name: assetSymbol,
      symbol: assetSymbol,
    }
  }

export const getAssetInfo = getAssetInfoFactory(assetsList)
