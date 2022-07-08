import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'

const NoOpenPosition: FC = () => {
  const { t } = useTranslation()
  return (
    <Typography component="div" textAlign="center" padding={(theme) => `${theme.spacing(2)} 0 ${theme.spacing(4)}`}>
      {t('dashboard:common.noOpenPosition')}
    </Typography>
  )
}
export default NoOpenPosition
