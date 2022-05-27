import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { BigNumber as BN } from '@ethersproject/bignumber'
import TextField from '@mui/material/TextField'
import { useContract } from 'domains/contract'

import { useSendTransaction } from 'app/web3/hooks/sendTransaction'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { SubTitle } from 'components/Styled'
import NFTCard from 'components/nft/NFTCard'
import { textCenterEllipsis } from 'utils/string/text-center-ellipsis'
import ConnectButton from 'app/wallet/ConnectButton'
import { toast } from 'lib/toastify'
import claimableNFT from 'lib/protocol/vinci-claimable-nft/fe.json'

import { useEligibilityResult } from './useEligibilityResult'
import NFTImage from './images/vinci NFT.jpg'
import { useWallet } from 'app/wallet'

const list: any = claimableNFT

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
}))

const EligibilityResult: FC = () => {
  const { status, account, setInputAccount } = useEligibilityResult()

  switch (status) {
    case 'needAccount':
      return <NeedAccount />
    case 'eligible':
      return <Eligibility account={account} />
    case 'notEligible':
      return <NotEligibility account={account} setInputAccount={setInputAccount} />
  }
}

const Eligibility: FC<{ account: string }> = ({ account }) => {
  const { t } = useTranslation('nft-airdrop')
  const [hasClaimed, setHasClaimed] = useState(false)
  const [loading, setLoading] = useState(false)
  const ROOT = useMemoEmpty(
    () => styled(Stack)`
      text-align: center;
    `
  )

  const NFT = useMemoEmpty(
    () => styled('div')`
      display: flex;
      justify-content: center;
    `
  )
  const { vinciNFT } = useContract()
  const sendTransaction = useSendTransaction()

  const onClick = useCallback(() => {
    const info = list[account]
    if (!info || !vinciNFT.contract) return
    console.log('[vinciNFT] [mint]', info.proof, info.value)
    setLoading(true)
    toast.promise(
      vinciNFT.contract.populateTransaction
        .mint(info.proof, info.value)
        .then((txData) =>
          sendTransaction({
            ...txData,
            value: txData.value ? BN.from(txData.value).toString() : undefined,
          })
        )
        .then(() => setHasClaimed(true))
        .finally(() => {
          setLoading(false)
        }),
      {
        pending: 'Transaction is pending',
        success: 'Transaction success 👌',
        error: 'Transaction rejected 🤯',
      },
      {
        position: toast.POSITION.BOTTOM_RIGHT,
      }
    )
  }, [account, sendTransaction, vinciNFT.contract])
  const { account: walletAccount } = useWallet()

  const action = useMemo(() => {
    if (account !== walletAccount) {
      return {
        tip: (
          <Typography variant="subtitle1" color="primary">
            {t('eligible.NFT.actions.tip.switchAccount')}
          </Typography>
        ),
      }
    }
    return {
      onClick,
      name: t('eligible.NFT.actions.' + (!hasClaimed ? 'claim' : 'claimed')),
      disabled: hasClaimed || loading,
    }
  }, [account, hasClaimed, loading, onClick, t, walletAccount])
  useEffect(() => {
    if (!vinciNFT.contract || !account) return
    vinciNFT.contract.hasClaimed(account).then((data) => setHasClaimed(data))
  }, [account, vinciNFT.contract])

  return (
    <ROOT spacing={2}>
      <Title>{t('eligible.title')}</Title>
      <SubTitle>{t('eligible.subTitle')}</SubTitle>
      <SubTitle>
        {textCenterEllipsis(account)} {t('eligible.willReceive')}
      </SubTitle>
      <NFT>
        <NFTCard image={NFTImage.src} description="Leonardo da Vinci NFT" action={action} />
      </NFT>
    </ROOT>
  )
}

const NotEligibility: FC<{ account: string; setInputAccount: any }> = ({ account, setInputAccount }) => {
  const { t } = useTranslation('nft-airdrop')
  const [open, setOpen] = useState(false)
  const [helperText, setHelperText] = useState('')
  const [input, setInput] = useState('')
  const ROOT = useMemoEmpty(
    () => styled(Stack)`
      text-align: center;
    `
  )
  const SwitchAccount = useMemoEmpty(
    () => styled(SubTitle)`
      display: flex;
      justify-content: center;
      align-items: center;
    `
  )
  const SwitchAccountSpan = useMemoEmpty(
    () => styled('span')`
      line-height: 36.5px;
    `
  )
  const Warn = useMemoEmpty(
    () => styled('div')`
      display: flex;
      justify-content: center;
      align-items: center;
    `
  )
  const WarnTip = useMemoEmpty(
    () => styled('div')`
      text-align: left;
      padding: 16px;
      padding-left: 21px;
      background: rgba(255, 199, 0, 0.3);
      position: relative;
      &::after {
        position: absolute;
        content: '';
        left: 0;
        top: 0;
        width: 5px;
        height: 100%;
        background: #ffc700;
      }
    `
  )
  const handleClose = useCallback(() => {
    setHelperText('')
    setOpen(false)
  }, [])
  const handleSwitchAccount = useCallback(() => {
    if (!input.startsWith('0x') || input.length !== 42) {
      setHelperText(t('switchAccountDialog.helperText'))
      return
    }
    setInputAccount(input)
    setInput('')
    setHelperText('')
    setOpen(false)
  }, [input, setInputAccount, t])
  return (
    <ROOT spacing={2}>
      <Title>{t('notEligible.title')}</Title>
      <div>
        <SubTitle>{t('notEligible.subTitle.1')}</SubTitle>
        <SubTitle>{t('notEligible.subTitle.2')}</SubTitle>
      </div>
      <SwitchAccount>
        <SwitchAccountSpan>{textCenterEllipsis(account)} - </SwitchAccountSpan>
        <Button variant="text" onClick={() => setOpen(true)}>
          {t('notEligible.actions.switchAccount')}
        </Button>
      </SwitchAccount>
      <Warn>
        <WarnTip>
          <SubTitle>{t('notEligible.warn.1')}</SubTitle>
          <SubTitle>{t('notEligible.warn.2')}</SubTitle>
        </WarnTip>
      </Warn>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('switchAccountDialog.title')}</DialogTitle>
        <DialogContent sx={{ width: '300px' }}>
          <TextField
            error={!helperText}
            autoFocus
            margin="dense"
            id="name"
            label={'ETH' + ' ' + t('switchAccountDialog.address')}
            helperText={helperText}
            fullWidth
            variant="standard"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('switchAccountDialog.actions.cancel')}</Button>
          <Button onClick={handleSwitchAccount}>{t('switchAccountDialog.actions.checkEligibilty')}</Button>
        </DialogActions>
      </Dialog>
    </ROOT>
  )
}

const NeedAccount: FC = () => {
  const ROOT = useMemoEmpty(
    () => styled('div')`
      display: flex;
      justify-content: center;
      margin: 16px 0;
    `
  )
  return (
    <ROOT>
      <ConnectButton />
    </ROOT>
  )
}

export default EligibilityResult
