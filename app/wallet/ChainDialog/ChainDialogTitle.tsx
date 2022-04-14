import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import DialogTitle from '@mui/material/DialogTitle'
import { Typography } from '@mui/material'

import { Title, SubTitle } from 'components/Styled'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { useWallet } from 'app/wallet'

const ChainDialogTitle: FC = () => {
  const { t } = useTranslation()
  const { network } = useWallet()
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
        <Title>{t('wallet.chain.title')}</Title>
        <SubTitle>
          {t('wallet.chain.subTitle')} 
          {
            network ? 
            <Typography component='span' color='primary'>
            {network.fullName}
            </Typography> : 
            <Typography component='span' color='error'>
              {t('wallet.chain.error')}
            </Typography>
          }
        </SubTitle>
      </ROOT>
    </DialogTitle>
  )
}

export default ChainDialogTitle
