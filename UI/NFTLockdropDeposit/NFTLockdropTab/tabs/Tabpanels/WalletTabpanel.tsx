import type { FC } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState, Fragment } from 'react'
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useContractNFT } from 'domains'
import { useControllers } from 'domains'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { useWallet } from 'app/wallet'
import { LockdropDepositTabValue } from 'app/App/pages/lockdropDeposit'
import { withTabPanel } from 'app/hoc/tabs/withTabPanel'
import { RESPONSIVE_DESIGN } from 'styles/constants'

import NFTCard from 'components/nft/NFTCard'
import NumberDisplay from 'components/math/NumberDisplay'

const WalletTabpanel = withTabPanel(
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
      nft: { lendingPoolAddress, underlyingAsset },
      walletNFT: { data, totalValuation },
    } = useContractNFT()
    const {
      erc721: { setApprovalForAll, isApprovedForAll },
    } = useControllers()
    const { account } = useWallet()

    const action = {
      name: 'Deposit',
      onClick: () => {},
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
    const [disabled, setDisabled] = useState(false)
    const onCheckChange = useCallback((id: string, value: boolean) => {
      const s = setRef.current
      if (value) {
        s.add(id)
      } else {
        s.delete(id)
      }
      setSize(s.size)
    }, [])
    const approveAllDisabled = useMemo(() => disabled, [disabled])

    useEffect(() => {
      if (!lendingPoolAddress || !underlyingAsset) return
      isApprovedForAll({
        user: account,
        spender: lendingPoolAddress,
        token: underlyingAsset,
      }).then((data) => {
        setDisabled(data)
      })
    }, [account, isApprovedForAll, lendingPoolAddress, underlyingAsset])

    const title = useMemo(
      () => ({
        text: (
          <Typography gutterBottom variant="subtitle2" component="div">
            <Stack spacing={2} direction="row">
              <span>{t('nft-lockdrop-deposit:tabs.totalValuation')}</span>
              <NumberDisplay value={totalValuation} type="network" />
            </Stack>
          </Typography>
        ),
        actions: (
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              disabled={approveAllDisabled}
              onClick={() => {
                setApprovalForAll
                  .post(
                    {
                      user: account,
                      spender: lendingPoolAddress,
                      token: underlyingAsset,
                      value: true,
                    },
                    { isOnlyApprove: true }
                  )
                  .then(() => {
                    setDisabled(true)
                  })
              }}
            >
              {t('nft-lockdrop-deposit:tabs.approveAll')}
            </Button>
            <Button variant="outlined" disabled={!size} onClick={() => {}}>
              {t('nft-lockdrop-deposit:tabs.depositSelected')}
            </Button>
          </Stack>
        ),
      }),
      [account, approveAllDisabled, lendingPoolAddress, setApprovalForAll, size, t, totalValuation, underlyingAsset]
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
    tabpanelKey: LockdropDepositTabValue.wallet,
  }
)

const NoData: FC = () => {
  const { t } = useTranslation()
  const {
    nft: { nftSetting },
  } = useContractNFT()

  return (
    <Fragment>
      <Stack alignItems="center" spacing={6} padding={10}>
        <Typography>{t('nft-lockdrop-deposit:tabs.wallet.noData.tip')}</Typography>
        <Button variant="contained" size="large" onClick={() => open(nftSetting.market.url, '_blank')}>
          {t('nft-lockdrop-deposit:tabs.wallet.noData.btn')}
        </Button>
      </Stack>
    </Fragment>
  )
}

export default WalletTabpanel
