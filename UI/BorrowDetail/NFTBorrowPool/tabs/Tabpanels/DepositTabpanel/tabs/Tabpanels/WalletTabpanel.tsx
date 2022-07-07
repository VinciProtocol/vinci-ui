import type { FC } from 'react'
import { useEffect, useMemo, useRef, useState, Fragment } from 'react'
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useContractNFT } from 'domains'
import { useControllers } from 'domains'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { useWallet } from 'app/wallet'
import { NFTTabValue } from 'app/App/pages/borrowDetail'
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
      nft: { lendingPoolAddress, underlyingAsset, walletUnderlyingAsset },
      walletNFT: { data, totalValuation },
    } = useContractNFT()
    const {
      reservesData,
      lendingPool: { depositNFT },
      erc721: { setApprovalForAll, isApprovedForAll },
    } = useControllers()
    const { networkAccount: account } = useWallet()
    const isPunks = useMemo(() => !!walletUnderlyingAsset, [walletUnderlyingAsset])
    const nft = useMemo(
      () => (isPunks ? walletUnderlyingAsset : underlyingAsset),
      [isPunks, underlyingAsset, walletUnderlyingAsset]
    )
    const displayCheckBox = useMemo(() => !isPunks, [isPunks])

    const action = {
      name: 'Deposit',
      onClick: (id: any) =>
        depositNFT
          .post({
            lendingPoolAddress,
            user: account,
            nft,
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
    const [disabled, setDisabled] = useState(false)
    const onCheckChange = useMemo(() => {
      if (!displayCheckBox) return
      return (id: string, value: boolean) => {
        const s = setRef.current
        if (value) {
          s.add(id)
        } else {
          s.delete(id)
        }
        setSize(s.size)
      }
    }, [displayCheckBox])
    const approveAllDisabled = useMemo(() => disabled, [disabled])

    useEffect(() => {
      if (!displayCheckBox) return
      if (!lendingPoolAddress || !underlyingAsset) return
      isApprovedForAll({
        user: account,
        spender: lendingPoolAddress,
        token: underlyingAsset,
      }).then((data) => {
        setDisabled(data)
      })
    }, [account, displayCheckBox, isApprovedForAll, lendingPoolAddress, underlyingAsset])

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
        actions: displayCheckBox ? (
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
              {t('borrow-detail:NFT.approveAll')}
            </Button>
            <Button
              variant="outlined"
              disabled={!size}
              onClick={() => {
                const s = setRef.current
                depositNFT
                  .post({
                    lendingPoolAddress,
                    user: account,
                    nft,
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
                    setDisabled(true)
                    setSize(0)
                  })
              }}
            >
              {t('borrow-detail:NFT.depositSelected')}
            </Button>
          </Stack>
        ) : (
          <div />
        ),
      }),
      [
        account,
        approveAllDisabled,
        depositNFT,
        displayCheckBox,
        isPunks,
        lendingPoolAddress,
        nft,
        setApprovalForAll,
        size,
        t,
        totalValuation,
        underlyingAsset,
      ]
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
    tabpanelKey: NFTTabValue.wallet,
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
        <Typography>{t('borrow-detail:NFT.wallet.noData.tip')}</Typography>
        <Button variant="contained" size="large" onClick={() => open(nftSetting.market.url, '_blank')}>
          {t('borrow-detail:NFT.wallet.noData.btn')}
        </Button>
      </Stack>
    </Fragment>
  )
}

export default WalletTabpanel
