import { styled } from '@mui/material/styles'
import { useMemo } from 'react'
import BigNumber from 'bignumber.js'

import { useWallet } from 'app/wallet'
import { useControllers } from 'domains'
import type { TransactionStatus } from 'domains/controllers/adapter/transaction'
import type { TabPanelBaseProps } from 'app/hoc/tabs/withTabPanel'

import type { TabValue } from '../constants'
import { useInputSlider } from '../hooks/tab/useInputSlider'

const defaultGetIsMax = (value: string, balance: string) => value === balance

export type TabPanelProps = {
  tabpanelKey: TabValue
  props: TabPanelBaseProps
  balance: BigNumber.Value
  balanceInUSD: string
  text: string
  dialog: {
    close: () => void
    tableData: any
    isApproved: boolean
  }
  req: {
    status: TransactionStatus
    post: (...args: any[]) => Promise<any>
    cancel: (...args: any[]) => void
    loading: boolean
  }
  getIsMax?: typeof defaultGetIsMax
}

export const createUseTabpanel = (props: {
  getPostProps: (props: {
    user: string
    amt: string
    lendingPoolAddress: string
    underlyingAsset: string
    variableDebtTokenAddress: string
    vTokenAddress: string
    isMax: Boolean
    isApproved: Boolean
  }) => void
}) => {
  const { getPostProps } = props
  return ({
    tabpanelKey,
    props: { TabPanel },
    balance: defaultBalance,
    balanceInUSD,
    dialog: { tableData, close, isApproved },
    req,
    text,
    getIsMax,
  }: TabPanelProps) => {
    getIsMax = getIsMax || defaultGetIsMax
    const ROOT = useMemo(
      () =>
        styled(TabPanel)(({ theme }) => ({
          paddingTop: theme.spacing(2),
        })),
      [TabPanel]
    )
    const balance: BigNumber = useMemo(() => new BigNumber(defaultBalance), [defaultBalance])
    const inputSlider = useInputSlider({ balance })
    const { account: user } = useWallet()

    const { reservesData, walletBalances, walletNFT } = useControllers()

    const title = useMemo(() => {
      const BN4 = BigNumber.clone({
        DECIMAL_PLACES: 4,
      })
      return {
        text,
        symbol: tableData.symbol,
        balance: balance.isNaN() ? '-' : new BN4(balance).div(1).toString(),
      }
    }, [balance, tableData.symbol, text])

    const info = useMemo(
      () => ({
        APY: tableData.APY,
        borrowAPY: tableData.borrowAPY,
        balanceInUSD,
      }),
      [tableData.APY, tableData.borrowAPY, balanceInUSD]
    )

    const { underlyingAsset, vTokenAddress, lendingPoolAddress, variableDebtTokenAddress } = tableData

    const actions = useMemo(() => {
      return {
        cancel: {
          disabled: req.loading,
          onClick: () => {
            close()
            req.cancel()
          },
        },
        confirm: {
          disabled: !user || !inputSlider.input.value || !parseFloat(inputSlider.input.value) || req.loading,
          onClick: () => {
            if (isApproved) close()
            req
              .post(
                getPostProps({
                  lendingPoolAddress,
                  variableDebtTokenAddress,
                  user,
                  amt: inputSlider.input.value,
                  underlyingAsset,
                  vTokenAddress,
                  isMax: getIsMax(inputSlider.input.value, balance.toString()),
                  isApproved,
                })
              )
              .then(() => {
                reservesData.restart()
                Object.keys(walletBalances).forEach((key) => walletBalances[key].restart())
                walletNFT.restart()
                if (isApproved) inputSlider.input.clear()
              })
          },
        },
        text: isApproved ? tabpanelKey : 'approve',
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      balance,
      req,
      user,
      inputSlider.input.value,
      close,
      underlyingAsset,
      vTokenAddress,
      lendingPoolAddress,
      isApproved,
      getIsMax,
    ])

    return {
      ROOT,
      req,
      inputSlider,
      title,
      actions,
      tabpanelKey,
      info,
    }
  }
}

export type TabInputSliderProps = {
  balance: BigNumber
}

export type UseTabpanelReturnValue = ReturnType<ReturnType<typeof createUseTabpanel>>
