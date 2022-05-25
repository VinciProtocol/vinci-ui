import type { FC } from 'react'
import { useMemo } from 'react'
import { cloneDeep, groupBy } from 'lodash'

import { createContext } from 'utils/createContext'
import { getCurrentTimestamp, RAY_DECIMALS, SECONDS_PER_YEAR } from 'app/App/constants'
import { useMemoLazy } from 'app/hooks/useMemoLazy'
import { getCompoundedBalance, getLinearBalance } from 'lib/protocol/ui-pool-data/pool-math'
import { calculateReserveDebt } from 'lib/protocol/ui-pool-data/formatters/reserve/calculate-reserve-debt'
import { normalizeBN, valueToBigNumber, valueToZDBigNumber } from 'utils/math'
import { rayPow, RAY } from 'utils/math/ray'
import { API_ETH_MOCK_ADDRESS } from 'lib/protocol/commons/utils'
import { log } from 'utils/dev'
import { useMarket } from 'domains'
import { safeGet } from 'utils/get'

import { useReservesDatas } from 'store/contract/uiPool/reservesDataFromAllPools/hooks'
import { useUserReservesDatas } from 'store/contract/uiPool/userReservesDataFromAllPools/hooks'
import { useWalletBalanceData } from 'store/contract/uiPool/walletBalances/hooks'
import { useWalletNFTData } from 'store/contract/uiPool/walletNFT/hooks'
import ContractNFTProvider from './nft'
export { createContractNFTContext } from './nft'
import ContractERC20Provider from './erc20'

const useContractDataService = () => {
  const { market } = useMarket()
  const reservesDatas = useReservesDatas()
  const userReservesDatas = useUserReservesDatas()
  const walletBalanceData = useWalletBalanceData()
  const walletNFTData = useWalletNFTData()
  const contractDataSource = useMemoLazy(() => {
    const returnValue = reservesDatas
      .map((reservesData) => {
        const nftSetting = safeGet(() => market.nfts[reservesData.nftVaults[0].underlyingAsset])
        if (!nftSetting) return
        const userReservesData = userReservesDatas.find(({ id }) => reservesData.id === id)
        const walletBalance = walletBalanceData.find(({ id }) => reservesData.id === id)
        const walletNFT = walletNFTData.find(({ id }) => reservesData.id === id)
        return {
          reservesData,
          userReservesData,
          walletBalance,
          walletNFT,
          nftSetting,
        }
      })
      .filter((reservesData) => reservesData)

    log('[domains] [contractDataSource]', returnValue)
    return returnValue
  }, [market, reservesDatas, userReservesDatas, walletBalanceData])

  const generalAssets = useMemo(() => {
    if (!contractDataSource) return [] as undefined
    const currentTimestamp = getCurrentTimestamp()
    const list = [] as any[]
    for (let i = 0; i < contractDataSource.length; i++) {
      const {
        reservesData,
        userReservesData,
        walletBalance: walletBalances,
        walletNFT: walletNFTs,
        nftSetting,
      } = contractDataSource[i]
      const { currency, reserves, nftVaults, id } = reservesData
      const nftVault = nftVaults[0]
      const collection = nftVault.symbol
      const collectionName = nftVault.name
      const { currencyPriceInUSD, currencyDecimals } = currency
      const nftPriceInUSD = normalizeBN(nftVault.priceInMarketReferenceCurrency, currencyDecimals).multipliedBy(
        currencyPriceInUSD
      )
      reserves.forEach((p) => {
        const poolReserve = cloneDeep(p)
        if (!poolReserve.isActive) return
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
          collectionName,
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

        list.push(returnValue)
      })
    }
    log('[domains] [generalAssets]', list)
    return list
  }, [contractDataSource])

  const { nftAssets, dashboard } = useMemo(() => {
    if (!generalAssets || !generalAssets.length)
      return {
        nftAssets: [],
        dashboard: {},
      } as undefined
    const obj = groupBy(generalAssets, 'id')
    const dashboard = {
      supplyBalanceInUSD: valueToBigNumber(0),
      netAPY: valueToBigNumber(0),
      borrowBalanceInUSD: valueToBigNumber(0),
      totalValueLockedInUSD: valueToBigNumber(0),
    }
    const nftAssets = Object.keys(obj).map((k) => {
      const list = obj[k]
      const info = {
        totalValueLockedInUSD: valueToBigNumber(0),
        totalBorrowedInUSD: valueToBigNumber(0),
        totalAvailableToBorrowInUSD: valueToBigNumber(0),
        totalUserAvailableToBorrowInUSD: valueToBigNumber(0),
        totalBorrowBalanceInUSD: valueToBigNumber(0),
        supplyBalanceInUSD: valueToBigNumber(0),
        borrowBalanceInUSD: valueToBigNumber(0),
        APY: valueToBigNumber(0),
        borrowAPY: valueToBigNumber(0),
      }
      const { nftVault, userNFTVault, walletNFTs, nftPriceInUSD, lendingPoolAddress, nftSetting, currency } = list[0]

      const { currencyPriceInUSD } = currency

      list.forEach(
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
          info.totalBorrowedInUSD = info.totalBorrowedInUSD.plus(totalBorrowed.multipliedBy(priceInUSD))
          info.totalUserAvailableToBorrowInUSD = info.totalUserAvailableToBorrowInUSD.plus(availableToBorrowInUSD)
          info.totalBorrowBalanceInUSD = info.totalBorrowBalanceInUSD.plus(borrowBalanceInUSD)
          info.supplyBalanceInUSD = info.supplyBalanceInUSD.plus(underlyingBalanceInUSD || 0)
          info.borrowBalanceInUSD = info.borrowBalanceInUSD.plus(borrowBalanceInUSD)
          // info.totalAvailableToBorrow = info.totalAvailableToBorrow.plus(totalAvailableToBorrow)
          info.totalAvailableToBorrowInUSD = info.totalAvailableToBorrowInUSD.plus(totalAvailableToBorrowInUSD)
          info.APY = APY
          info.borrowAPY = borrowAPY
        }
      )
      const {
        totalBorrowedInUSD,
        totalBorrowBalanceInUSD,
        totalAvailableToBorrowInUSD,
        totalUserAvailableToBorrowInUSD,
      } = info
      const {
        symbol: collection,
        name,
        underlyingAsset,
        reserveLiquidationThreshold,
        totalNumberOfCollateral,
        baseLTVasCollateral,
        reserveLiquidationBonus,
        lockActionExpiration,
      } = nftVault
      let collateralValueInUSD = valueToBigNumber(0)
      let borrowLimitInUSD = valueToBigNumber(0)
      let depositCount = valueToBigNumber(0)
      let userLockedNFT = 0
      if (userNFTVault) {
        const now = new Date().getTime()
        depositCount = userNFTVault.nTokenBalance
        collateralValueInUSD = depositCount.multipliedBy(nftPriceInUSD)
        borrowLimitInUSD = collateralValueInUSD.multipliedBy(baseLTVasCollateral)
        userLockedNFT = userNFTVault.locks.filter(({ expiration }: any) => expiration > now).length
      }
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

      const nftWallet = {
        underlyingAsset,
        tokenIds: [] as any[],
      }
      if (walletNFTs && collection) {
        const tokenIds = walletNFTs.data[underlyingAsset]
        if (tokenIds) {
          nftWallet.tokenIds = tokenIds
        }
      }

      const nft = {
        lendingPoolAddress,
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
        underlyingAsset,
        currentFloorPrice: nftPriceInUSD.div(currencyPriceInUSD),
        currentFloorPriceInUSD: nftPriceInUSD,
        totalCollateralledValue: totalCollateralledValueInUSD.div(currencyPriceInUSD),
        activeCollaterals: totalNumberOfCollateral,
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
        userLockedNFT,
      }

      const { APY, borrowAPY, supplyBalanceInUSD, borrowBalanceInUSD, totalValueLockedInUSD } = info
      const total = supplyBalanceInUSD.plus(borrowBalanceInUSD)
      const netAPY = total.eq(0)
        ? 0
        : supplyBalanceInUSD.multipliedBy(APY).minus(borrowBalanceInUSD.multipliedBy(borrowAPY)).div(total)

      dashboard.borrowBalanceInUSD = dashboard.borrowBalanceInUSD.plus(borrowBalanceInUSD)
      dashboard.supplyBalanceInUSD = dashboard.supplyBalanceInUSD.plus(supplyBalanceInUSD)
      dashboard.totalValueLockedInUSD = dashboard.totalValueLockedInUSD.plus(totalValueLockedInUSD)
      dashboard.netAPY = dashboard.netAPY.plus(netAPY)

      return nft
    })
    log('[domains] [nftAssetsalAssets]', { nftAssets, dashboard })
    return { nftAssets, dashboard }
  }, [generalAssets])

  return { generalAssets, nftAssets, dashboard }
}

export type ContractData = ReturnType<typeof useContractDataService>

const { Provider: ContractProvider, createUseContext } = createContext(useContractDataService)

const Provider: FC = ({ children }) => {
  return (
    <ContractProvider>
      <ContractNFTProvider>
        <ContractERC20Provider>{children}</ContractERC20Provider>
      </ContractNFTProvider>
    </ContractProvider>
  )
}

export default Provider

export const createContractDataContext = createUseContext
