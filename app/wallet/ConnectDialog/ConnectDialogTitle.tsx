import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import DialogTitle from '@mui/material/DialogTitle'

import { Title, SubTitle } from 'components/Styled'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { useWallet } from 'app/wallet'

const ConnectDialogTitle: FC = () => {
  const { t } = useTranslation()
  const { status } = useWallet()
  const ROOT = useMemoEmpty(
    () => styled('div')`
      ${({ theme }) => ({
        margin: `${theme.spacing(2)} 0`,
      })}

      ${Title}, ${SubTitle} {
        text-align: center;
      }
    `
  )

  return (
    <DialogTitle>
      <ROOT>
        <Title>{t(`wallet.${status}.title`)}</Title>
        <SubTitle>{t(`wallet.${status}.subTitle`)}</SubTitle>
      </ROOT>
    </DialogTitle>
  )
}

export default ConnectDialogTitle
