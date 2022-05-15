import type { FC } from 'react'
import { useRouter } from 'next/router'
import { useWallet } from 'app/wallet'
import { useTranslation } from 'next-i18next'
import Button from '@mui/material/Button'
import Icon from '@mui/icons-material/CelebrationTwoTone'
import { ChainId } from 'app/web3/chain/types'

export const NFTAirdropButton: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { chainId } = useWallet()
  if (chainId !== ChainId.ethereum) return null
  return (
    <Button
      key="nft-airdrop-button"
      variant="transOutlined"
      startIcon={<Icon />}
      onClick={() => {
        router.push({
          pathname: '/nft-airdrop',
        })
      }}
    >
      {t('router:menu.NFTAirdrop')}
    </Button>
  )
}

export default NFTAirdropButton
