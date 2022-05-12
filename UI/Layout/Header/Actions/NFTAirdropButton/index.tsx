import type { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Button from '@mui/material/Button'
import Icon from './celebrateTwoTone.svg'

export const NFTAirdropButton: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <Button
      key="nft-airdrop-button"
      variant="transOutlined"
      startIcon={<Image src={Icon} alt="NFTAirdrop" />}
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
