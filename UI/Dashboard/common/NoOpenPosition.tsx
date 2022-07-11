import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'

type NoOpenPositionProps = {
  text?: string
}
const NoOpenPosition: FC<NoOpenPositionProps> = ({ text: title }) => {
  const { t } = useTranslation()
  return (
    <Typography
      component="div"
      color="text.secondary"
      textAlign="center"
      padding={(theme) => `${theme.spacing(2)} 0 ${theme.spacing(4)}`}
    >
      {t(title || 'dashboard:common.noOpenPosition')}
    </Typography>
  )
}
export default NoOpenPosition
