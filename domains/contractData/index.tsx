import type { FC } from 'react'
import { useMemo } from 'react'
import { cloneDeep } from 'lodash'

import { createContext } from 'utils/createContext'
import { getCurrentTimestamp, RAY_DECIMALS, SECONDS_PER_YEAR } from '@vinci-protocol/math'
import { useMemoLazy } from '@vinci-protocol/hooks'
import {
  getCompoundedBalance,
  getLinearBalance,
  API_ETH_MOCK_ADDRESS,
  calculateReserveDebt,
} from '@vinci-protocol/protocol'
import { normalizeBN, valueToBigNumber, valueToZDBigNumber, rayPow, RAY } from '@vinci-protocol/math'
import { log } from 'utils/dev'
import { useMarket } from 'domains'
import { safeGet } from 'utils/get'

import { useReservesDatas, useUserReservesDatas } from '@vinci-protocol/store'
import { useWalletBalanceData } from 'store/contract/uiPool/walletBalances/hooks'
import { useWalletNFTData } from 'store/contract/uiPool/walletNFT/hooks'

import ContractNFTProvider from './nft'
export { createContractNFTContext } from './nft'
import ContractERC20Provider from './erc20'
import type { WalletBalancesData } from 'store/contract/uiPool/walletBalances/adapter/walletBalanceAdapter'
import { getNFTMeta } from 'app/web3/market/NFTMeta'

const useContractDataService = () => {
  const { market } = useMarket()
  const reservesDatas = useReservesDatas()
  const userReservesDatas = useUserReservesDatas()
  const walletBalanceData = useWalletBalanceData()
  const walletNFTData = useWalletNFTData()
  const contractDataSource = useMemoLazy(() => {
    const returnValue = reservesDatas
      .map((reservesData) => {
        const nftSettings = safeGet(() =>
          reservesData.nftVaults.map(({ underlyingAsset }) => market.nfts[underlyingAsset])
        )
        if (!nftSettings.length) return
        const marketId = reservesData.id

        const userReservesData = userReservesDatas.find(({ id }) => marketId === id)
        let walletBalance: WalletBalancesData
        const marketInfo = market.info[marketId]
        if (marketInfo && marketInfo.lendingPoolAddressesProvider) {
          walletBalance = walletBalanceData.find(
            ({ lendingPoolAddressesProvider }) =>
              marketInfo.lendingPoolAddressesProvider === lendingPoolAddressesProvider
          )
        }

        return {
          reservesData,
          userReservesData,
          walletBalance,
          walletNFT: walletNFTData,
          nftSettings,
        }
      })
      .filter((reservesData) => reservesData)

    log('[domains] [contractDataSource]', returnValue)
    if (__DEV__) {
      const getTitle = (symbol: string) => {
        let title = symbol.toLowerCase()
        return `${title[0].toUpperCase()}${title.substring(1)}`
      }
      const vNFT = returnValue.reduce((obj, { reservesData, nftSettings }) => {
        if (!reservesData || !reservesData.nftVaults) return obj
        reservesData.nftVaults.forEach(({ nTokenAddress }, index) => {
          const nftSetting = nftSettings[index]
          if (!nftSetting) return
          const meta = getNFTMeta(nftSetting)
          obj[`V ${getTitle(nftSetting.symbol)}`] = {
            ...meta,
            nTokenAddress,
          }
        })
        return obj
      }, {} as any)
      log('[domains] [vNFT]', { vNFT })
    }
    return returnValue
  }, [market, reservesDatas, userReservesDatas, walletBalanceData, walletNFTData])

  const { generalAssets, generalAssetsMap } = useMemo(() => {
    if (!contractDataSource) {
      return {
        generalAssets: [],
      } as undefined
    }
    const currentTimestamp = getCurrentTimestamp()
    const generalAssets = [] as any[]
    const generalAssetsMap = {} as any
    for (let i = 0; i < contractDataSource.length; i++) {
      const {
        reservesData,
        userReservesData,
        walletBalance: walletBalances,
        walletNFT: walletNFTs,
        nftSettings,
      } = contractDataSource[i]
      const { currency, reserves, nftVaults, id } = reservesData
      const { currencyPriceInUSD, currencyDecimals } = currency

      generalAssetsMap[id] = {
        nftVaults: nftVaults.map((nftVault, index) => {
          const nftSetting = nftSettings[index] || ({} as undefined)
          let nftPriceInUSD = normalizeBN(nftVault.priceInMarketReferenceCurrency, currencyDecimals).multipliedBy(
            currencyPriceInUSD
          )
          const NFT_ID = nftSetting.NFT_ID
          return {
            ...nftVault,
            NFT_ID,
            collection: nftSetting.name,
            nftPriceInUSD,
            currency,
            nftSetting,
            userNFTVaults: userReservesData?.userNFTVaults || [],
            walletNFTs,
          }
        }),
        reserves: [],
      }
      const nftVault = generalAssetsMap[id].nftVaults[0]
      if (!nftVault) continue
      const { nftPriceInUSD, collection } = nftVault
      reserves.forEach((p) => {
        const poolReserve = cloneDeep(p)
        if (!poolReserve.isActive) return
        const nftSetting = nftSettings[0] || ({} as undefined)
        const {
          underlyingAsset,
          vTokenAddress,
          variableDebtTokenAddress,
          symbol,
          priceInMarketReferenceCurrency,
          decimals,
        } = poolReserve
        const marketRefCurrencyDecimals = decimals.toNumber()

        const priceInUSD = normalizeBN(priceInMarketReferenceCurrency, marketRefCurrencyDecimals).multipliedBy(
          currencyPriceInUSD
        )
        const availableLiquidity = normalizeBN(poolReserve.availableLiquidity, marketRefCurrencyDecimals)
        const { totalDebt: totalDebtN } = calculateReserveDebt(poolReserve, currentTimestamp)
        const totalDebt = normalizeBN(totalDebtN, marketRefCurrencyDecimals)
        const totalLiquidity = totalDebt.plus(availableLiquidity)
        const utilizationRate = totalLiquidity.eq(0)
          ? valueToBigNumber(0)
          : valueToBigNumber(totalDebt).dividedBy(totalLiquidity)
        const supplyAPY = normalizeBN(
          rayPow(
            valueToZDBigNumber(poolReserve.liquidityRate).dividedBy(SECONDS_PER_YEAR).plus(RAY),
            SECONDS_PER_YEAR
          ).minus(RAY),
          RAY_DECIMALS
        )
        const variableBorrowAPY = normalizeBN(
          rayPow(
            valueToZDBigNumber(poolReserve.variableBorrowRate).dividedBy(SECONDS_PER_YEAR).plus(RAY),
            SECONDS_PER_YEAR
          ).minus(RAY),
          RAY_DECIMALS
        )

        const totalAvailableToBorrow = totalLiquidity.minus(totalDebt)
        let totalAvailableToBorrowInUSD = totalAvailableToBorrow.multipliedBy(priceInUSD)
        totalAvailableToBorrowInUSD = totalAvailableToBorrowInUSD.lt(0)
          ? valueToBigNumber(0)
          : totalAvailableToBorrowInUSD

        let poolUserReserve: any = {
          availableToBorrowInUSD: valueToBigNumber(0),
        }
        if (userReservesData) {
          const { userReserves, userNFTVaults } = userReservesData
          const userReserve = userReserves.find((u) => u.underlyingAsset === underlyingAsset)
          if (userReserve) {
            const userNFTVault = userNFTVaults.find((i) => i.underlyingAsset === nftVault.underlyingAsset)
            const underlyingBalance = normalizeBN(
              getLinearBalance({
                balance: userReserve.scaledVTokenBalance,
                index: poolReserve.liquidityIndex,
                rate: poolReserve.liquidityRate,
                lastUpdateTimestamp: poolReserve.lastUpdateTimestamp,
                currentTimestamp,
              }),
              marketRefCurrencyDecimals
            )
            const underlyingBalanceInUSD = underlyingBalance.multipliedBy(priceInUSD)

            const borrowBalance = normalizeBN(
              getCompoundedBalance({
                principalBalance: userReserve.scaledVariableDebt,
                reserveIndex: poolReserve.variableBorrowIndex,
                reserveRate: poolReserve.variableBorrowRate,
                lastUpdateTimestamp: poolReserve.lastUpdateTimestamp,
                currentTimestamp,
              }),
              marketRefCurrencyDecimals
            )
            const borrowBalanceInUSD = borrowBalance.multipliedBy(priceInUSD)
            const userAvailableToBorrowInUSD = nftPriceInUSD
              .multipliedBy(userNFTVault.nTokenBalance)
              .multipliedBy(nftVault.baseLTVasCollateral)
              .minus(borrowBalanceInUSD)

            const isInsufficientLiquidity = totalAvailableToBorrowInUSD.lt(userAvailableToBorrowInUSD)
            let availableToBorrowInUSD = isInsufficientLiquidity
              ? totalAvailableToBorrowInUSD
              : userAvailableToBorrowInUSD

            availableToBorrowInUSD = availableToBorrowInUSD.lt(0) ? valueToBigNumber(0) : availableToBorrowInUSD
            poolUserReserve = {
              isInsufficientLiquidity,
              userNFTVault,
              underlyingBalance,
              underlyingBalanceInUSD,
              borrowBalance,
              borrowBalanceInUSD,
              availableToBorrow: availableToBorrowInUSD.div(priceInUSD),
              availableToBorrowInUSD,
            }
          }
        }

        const returnValue = {
          id,
          underlyingAsset,
          vTokenAddress,
          variableDebtTokenAddress,
          lendingPoolAddress: nftSetting.LENDING_POOL,
          nftSetting,
          symbol,
          collection,
          NFT_ID: nftSetting.NFT_ID,
          priceInUSD,
          APY: supplyAPY,
          borrowAPY: variableBorrowAPY,
          totalSupply: totalLiquidity,
          totalBorrowed: totalDebt,
          utilization: utilizationRate,
          totalAvailableToBorrow,
          totalAvailableToBorrowInUSD,
          nftVault,
          walletNFTs,
          currency,
          nftPriceInUSD,
          ...poolUserReserve,
        }

        if (symbol === 'WETH') {
          returnValue.symbol = 'ETH'
          returnValue.underlyingAsset = API_ETH_MOCK_ADDRESS
        } else if (symbol === 'WBNB') {
          returnValue.symbol = 'BNB'
          returnValue.underlyingAsset = API_ETH_MOCK_ADDRESS
        }

        if (walletBalances) {
          const walletBalance = normalizeBN(walletBalances.data[returnValue.underlyingAsset], marketRefCurrencyDecimals)
          if (walletBalance) {
            const walletBalanceInUSD = walletBalance.multipliedBy(priceInUSD)
            returnValue.walletBalance = walletBalance
            returnValue.walletBalanceInUSD = walletBalanceInUSD
          }
        }

        generalAssets.push(returnValue)
        generalAssetsMap[id].reserves.push(returnValue)
      })
    }

    const returnValue = { generalAssets, generalAssetsMap }

    log('[domains] [generalAssets]', returnValue)
    return returnValue
  }, [contractDataSource])

  const { nftAssets, dashboard } = useMemo(() => {
    if (!generalAssetsMap)
      return {
        nftAssets: [],
        dashboard: {},
      } as undefined
    const dashboard = {
      supplyBalanceInUSD: valueToBigNumber(0),
      supplyBalance: valueToBigNumber(0),
      netAPY: valueToBigNumber(0),
      depositAPYSum: valueToBigNumber(0),
      borrowAPYSum: valueToBigNumber(0),
      TVL: valueToBigNumber(0),
      borrowBalanceInUSD: valueToBigNumber(0),
      borrowBalance: valueToBigNumber(0),
      totalValueLockedInUSD: valueToBigNumber(0),
      totalValueLocked: valueToBigNumber(0),
      totalBorrowed: valueToBigNumber(0),
      totalCollateralledValue: valueToBigNumber(0),
    }
    const nftAssets = Object.keys(generalAssetsMap).reduce((nftAssets, k) => {
      const reserves = generalAssetsMap[k].reserves
      const info = {
        totalValueLockedInUSD: valueToBigNumber(0),
        totalBorrowedInUSD: valueToBigNumber(0),
        totalBorrowed: valueToBigNumber(0),
        totalAvailableToBorrowInUSD: valueToBigNumber(0),
        totalUserAvailableToBorrowInUSD: valueToBigNumber(0),
        totalBorrowBalanceInUSD: valueToBigNumber(0),
        supplyBalanceInUSD: valueToBigNumber(0),
        borrowBalanceInUSD: valueToBigNumber(0),
        depositAPYSum: valueToBigNumber(0),
        borrowAPYSum: valueToBigNumber(0),
        depositAPY: valueToBigNumber(0),
        borrowAPY: valueToBigNumber(0),
        supplyBalance: valueToBigNumber(0),
        borrowBalance: valueToBigNumber(0),
        totalValueLocked: valueToBigNumber(0),
        totalCollateralledValue: valueToBigNumber(0),
      }
      reserves.forEach(
        ({
          priceInUSD,
          APY,
          borrowAPY,
          totalSupply,
          totalBorrowed,
          borrowBalanceInUSD,
          availableToBorrowInUSD,
          totalAvailableToBorrowInUSD,
          underlyingBalanceInUSD,
        }: any) => {
          info.totalValueLockedInUSD = info.totalValueLockedInUSD.plus(totalSupply.multipliedBy(priceInUSD))
          info.totalValueLocked = info.totalValueLocked.plus(totalSupply)
          info.totalBorrowedInUSD = info.totalBorrowedInUSD.plus(totalBorrowed.multipliedBy(priceInUSD))
          info.totalBorrowed = info.totalBorrowed.plus(totalBorrowed)
          info.totalUserAvailableToBorrowInUSD = info.totalUserAvailableToBorrowInUSD.plus(availableToBorrowInUSD)
          info.totalBorrowBalanceInUSD = info.totalBorrowBalanceInUSD.plus(borrowBalanceInUSD)
          info.supplyBalanceInUSD = info.supplyBalanceInUSD.plus(underlyingBalanceInUSD || 0)
          const supplyBalance = valueToBigNumber(underlyingBalanceInUSD || 0).div(priceInUSD)
          info.supplyBalance = info.supplyBalance.plus(supplyBalance)
          info.borrowBalanceInUSD = info.borrowBalanceInUSD.plus(borrowBalanceInUSD)
          const borrowBalance = valueToBigNumber(borrowBalanceInUSD || 0).div(priceInUSD)
          info.borrowBalance = info.borrowBalance.plus(borrowBalance)
          // info.totalAvailableToBorrow = info.totalAvailableToBorrow.plus(totalAvailableToBorrow)
          info.totalAvailableToBorrowInUSD = info.totalAvailableToBorrowInUSD.plus(totalAvailableToBorrowInUSD)
          info.depositAPYSum = info.depositAPYSum.plus(supplyBalance.multipliedBy(APY))
          info.borrowAPYSum = info.borrowAPYSum.plus(borrowBalance.multipliedBy(borrowAPY))

          // TODO
          info.borrowAPY = borrowAPY
          info.depositAPY = APY
        }
      )
      const {
        totalBorrowedInUSD,
        totalBorrowBalanceInUSD,
        totalAvailableToBorrowInUSD,
        totalUserAvailableToBorrowInUSD,
        borrowAPY,
      } = info

      generalAssetsMap[k].nftVaults.forEach(
        ({
          collection,
          name,
          underlyingAsset,
          nTokenAddress,
          reserveLiquidationThreshold,
          totalNumberOfCollateral,
          baseLTVasCollateral,
          reserveLiquidationBonus,
          lockActionExpiration,
          nftPriceInUSD,
          currency: { currencyPriceInUSD },
          nftSetting: nS,
          userNFTVaults,
          walletNFTs,
        }: any) => {
          let collateralValueInUSD = valueToBigNumber(0)
          let borrowLimitInUSD = valueToBigNumber(0)
          let depositCount = valueToBigNumber(0)
          let nftSetting = nS || {}
          const userNFTVault = userNFTVaults.find((i: any) => i.underlyingAsset === underlyingAsset)
          userNFTVaults.forEach((userNFTVault: any) => {
            depositCount = userNFTVault.nTokenBalance
            collateralValueInUSD = depositCount.multipliedBy(nftPriceInUSD)
            borrowLimitInUSD = collateralValueInUSD.multipliedBy(baseLTVasCollateral)
          })
          const borrowLimitUtilization = borrowLimitInUSD.eq(0)
            ? 0
            : totalBorrowBalanceInUSD.div(borrowLimitInUSD).toNumber()
          const healthFactor = totalBorrowBalanceInUSD.eq(0)
            ? valueToBigNumber(0)
            : collateralValueInUSD.multipliedBy(reserveLiquidationThreshold).div(totalBorrowBalanceInUSD)
          const liquidationPriceInUSD = depositCount.eq(0)
            ? valueToBigNumber(0)
            : totalBorrowBalanceInUSD.div(depositCount.multipliedBy(reserveLiquidationThreshold))

          const totalCollateralledValueInUSD = totalNumberOfCollateral.multipliedBy(nftPriceInUSD)
          const walletUnderlyingAsset = nftSetting.walletUnderlyingAsset

          const nftWallet = {
            underlyingAsset: walletUnderlyingAsset || underlyingAsset,
            tokenIds: [] as any[],
          }
          if (walletNFTs && collection) {
            const walletNFT = walletNFTs.find(({ underlyingNFT }: any) => underlyingNFT === nftWallet.underlyingAsset)
            if (walletNFT && walletNFT.tokenIds) {
              nftWallet.tokenIds = walletNFT.tokenIds
            }
          }

          const nft = {
            lendingPoolAddress: nftSetting.LENDING_POOL,
            nftSetting,
            borrowBalance: totalBorrowBalanceInUSD.div(currencyPriceInUSD),
            borrowBalanceInUSD: totalBorrowBalanceInUSD,
            baseLTVasCollateral,
            depositCount,
            collateralValue: collateralValueInUSD.div(currencyPriceInUSD),
            collateralValueInUSD,
            healthFactor,
            liquidationPrice: liquidationPriceInUSD.div(currencyPriceInUSD),
            liquidationPriceInUSD,
            liquidationFee: reserveLiquidationBonus,
            borrowLimit: borrowLimitInUSD.div(currencyPriceInUSD),
            borrowLimitInUSD,
            borrowLimitUtilization: borrowLimitUtilization > 1 ? 1 : borrowLimitUtilization,
            collection,
            NFT_ID: nftSetting.NFT_ID,
            underlyingAsset,
            nTokenAddress,
            walletUnderlyingAsset,
            nTokenUnderlyingAsset: nftSetting.nToken,
            currentFloorPrice: nftPriceInUSD.div(currencyPriceInUSD),
            currentFloorPriceInUSD: nftPriceInUSD,
            activeCollaterals: totalNumberOfCollateral,
            totalCollateralledValue: totalCollateralledValueInUSD.div(currencyPriceInUSD),
            totalCollateralledValueInUSD,
            totalBorrowed: totalBorrowedInUSD.div(currencyPriceInUSD),
            totalBorrowedInUSD,
            availableToBorrow: totalAvailableToBorrowInUSD.div(currencyPriceInUSD),
            availableToBorrowInUSD: totalAvailableToBorrowInUSD,
            totalUserAvailableToBorrowInUSD,
            totalUserAvailableToBorrow: totalUserAvailableToBorrowInUSD.div(currencyPriceInUSD),
            nftWallet,
            userNFTVault,
            name,
            lockActionExpiration: lockActionExpiration * 1000,
            reserves,
            borrowAPY,
          }

          nftAssets.push(nft)

          info.totalCollateralledValue = info.totalCollateralledValue.plus(nft.totalCollateralledValue)
        }
      )

      const {
        supplyBalanceInUSD,
        borrowBalanceInUSD,
        totalValueLockedInUSD,
        borrowBalance,
        supplyBalance,
        totalValueLocked,
        totalBorrowed,
        totalCollateralledValue,
        depositAPYSum,
        borrowAPYSum,
      } = info

      dashboard.borrowBalanceInUSD = dashboard.borrowBalanceInUSD.plus(borrowBalanceInUSD)
      dashboard.supplyBalanceInUSD = dashboard.supplyBalanceInUSD.plus(supplyBalanceInUSD)
      dashboard.totalValueLockedInUSD = dashboard.totalValueLockedInUSD.plus(totalValueLockedInUSD)
      dashboard.borrowBalance = dashboard.borrowBalance.plus(borrowBalance)
      dashboard.supplyBalance = dashboard.supplyBalance.plus(supplyBalance)
      dashboard.totalBorrowed = dashboard.totalBorrowed.plus(totalBorrowed)
      dashboard.totalValueLocked = dashboard.totalValueLocked.plus(totalValueLocked)
      dashboard.totalCollateralledValue = dashboard.totalCollateralledValue.plus(totalCollateralledValue)
      dashboard.depositAPYSum = dashboard.depositAPYSum.plus(depositAPYSum)
      dashboard.borrowAPYSum = dashboard.borrowAPYSum.plus(borrowAPYSum)
      return nftAssets
    }, [])

    const total = dashboard.supplyBalance.plus(dashboard.borrowBalance)
    if (!total.eq(0)) {
      dashboard.netAPY = total.eq(0)
        ? valueToBigNumber(0)
        : dashboard.depositAPYSum.minus(dashboard.borrowAPYSum).div(total)
    }
    dashboard.TVL = dashboard.totalBorrowed.plus(dashboard.supplyBalance).plus(dashboard.totalCollateralledValue)

    log('[domains] [nftAssetsalAssets]', { nftAssets, dashboard })
    return { nftAssets, dashboard }
  }, [generalAssetsMap])

  return { generalAssets, nftAssets, dashboard }
}

export type ContractData = ReturnType<typeof useContractDataService>

const { Provider: ContractDataProvider, createUseContext } = createContext(useContractDataService)

const Provider: FC = ({ children }) => {
  return (
    <ContractDataProvider>
      <ContractNFTProvider>
        <ContractERC20Provider>{children}</ContractERC20Provider>
      </ContractNFTProvider>
    </ContractDataProvider>
  )
}

export default Provider

export const createContractDataContext = createUseContext
