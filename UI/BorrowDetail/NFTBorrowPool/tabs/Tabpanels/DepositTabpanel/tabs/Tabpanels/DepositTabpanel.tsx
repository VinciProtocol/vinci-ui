import type { FC } from 'react'
import { useCallback, useMemo, useRef, useState, Fragment } from 'react'
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useContractNFT, useControllers } from 'domains'

import { useApp } from 'app/App'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { useWallet } from 'app/wallet'
import { NFTTabValue } from 'app/App/pages/borrowDetail'
import { withTabPanel } from 'app/hoc/tabs/withTabPanel'
import { RESPONSIVE_DESIGN } from 'styles/constants'

import NFTCard from 'components/nft/NFTCard'
import NumberDisplay from 'components/math/NumberDisplay'

const DepositTabpanel = withTabPanel(
  (props) => {
    const { t } = useTranslation()
    const Title = useMemoEmpty(() =>
      styled('div')(({ theme }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(2),
      }))
    )
    const { TabPanel } = props
    const {
      nft: { lendingPoolAddress, underlyingAsset, walletUnderlyingAsset, nTokenAddress },
      userNFT: { data, totalValuation },
    } = useContractNFT()
    const {
      reservesData,
      lendingPool: { withdrawNFT },
    } = useControllers()

    const { networkAccount: account } = useWallet()
    const isPunks = useMemo(() => !!walletUnderlyingAsset, [walletUnderlyingAsset])

    const action = {
      name: 'Withdraw',
      onClick: (id: any) =>
        withdrawNFT
          .post({
            lendingPoolAddress,
            user: account,
            nft: isPunks ? nTokenAddress : underlyingAsset,
            tokenIds: [id],
            amounts: ['1'],
            isPunks,
          })
          .then(() => {
            reservesData.restart()
          }),
    }

    const tabs = useMemo(() => {
      const t: any[][] = [[]]
      if (!data) return t
      data.forEach((d, i) => {
        const index = Math.floor(i / 3)
        if (!t[index]) t[index] = []
        t[index].push(d)
      })
      return t
    }, [data])

    const setRef = useRef<Set<string>>(new Set())
    const [size, setSize] = useState(0)
    const onCheckChange = useCallback((id: string, value: boolean) => {
      const s = setRef.current
      if (value) {
        s.add(id)
      } else {
        s.delete(id)
      }
      setSize(s.size)
    }, [])
    const title = useMemo(
      () => ({
        text: (
          <Typography gutterBottom variant="subtitle2" component="div">
            <Stack spacing={2} direction="row">
              <span>{t('borrow-detail:NFT.totalValuation')}</span>
              <NumberDisplay value={totalValuation} type="network" />
            </Stack>
          </Typography>
        ),
        actions: (
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              disabled={!size}
              onClick={() => {
                const s = setRef.current
                withdrawNFT
                  .post({
                    lendingPoolAddress,
                    user: account,
                    nft: isPunks ? nTokenAddress : underlyingAsset,
                    tokenIds: Array.from(s.values()),
                    amounts: (() => {
                      const list = []
                      for (let i = 0; i < s.size; i++) {
                        list.push('1')
                      }
                      return list
                    })(),
                    isPunks,
                  })
                  .then(() => {
                    s.clear()
                    setSize(0)
                  })
              }}
            >
              {t('borrow-detail:NFT.withdrawSelected')}
            </Button>
          </Stack>
        ),
      }),
      [account, isPunks, lendingPoolAddress, nTokenAddress, size, t, totalValuation, underlyingAsset, withdrawNFT]
    )

    return (
      <TabPanel>
        <Title sx={RESPONSIVE_DESIGN.display.NEXS('flex')}>
          {title.text}
          {title.actions}
        </Title>

        <Stack spacing={2} sx={RESPONSIVE_DESIGN.display.NEXS('flex')}>
          {tabs.map((ts, index) => (
            <Stack spacing={2} direction="row" key={index}>
              {ts.map((nft) => (
                <NFTCard key={nft.id} {...{ ...nft, action, onCheckChange }} />
              ))}
            </Stack>
          ))}
          {!data.length && <NoData />}
        </Stack>

        <Stack spacing={2} sx={[RESPONSIVE_DESIGN.display.XS('flex')]}>
          {title.text}
          {title.actions}
          <Stack
            spacing={2}
            sx={[
              {
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
          >
            {tabs.map((ts) => ts.map((nft) => <NFTCard key={nft.id} {...{ ...nft, action, onCheckChange }} />))}
            {!data.length && <NoData />}
          </Stack>
        </Stack>
      </TabPanel>
    )
  },
  {
    tabpanelKey: NFTTabValue.deposit,
  }
)

const NoData: FC = () => {
  const { t } = useTranslation()
  const {
    pages: {
      borrowDetail: {
        NTFTabs: { setTab },
      },
    },
  } = useApp()
  return (
    <Fragment>
      <Stack alignItems="center" spacing={6} padding={10}>
        <Typography>{t('borrow-detail:NFT.deposit.noData.tip')}</Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            setTab(NFTTabValue.wallet)
          }}
        >
          {t('borrow-detail:NFT.deposit.noData.btn')}
        </Button>
      </Stack>
    </Fragment>
  )
}

export default DepositTabpanel
