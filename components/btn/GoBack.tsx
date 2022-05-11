import type { FC } from 'react'
import type { UrlObject } from 'url'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

type Url = UrlObject | string
interface TransitionOptions {
  shallow?: boolean
  locale?: string | false
  scroll?: boolean
}
type GoBackProps = {
  url: Url
  as?: Url
  options?: TransitionOptions
}

const GoBack: FC<GoBackProps> = ({ url, as, options }) => {
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <Button
      sx={{
        width: '120px',
      }}
      onClick={() => router.push(url, as, options)}
    >
      <Stack spacing={2} direction="row">
        <ArrowBackIcon />
        <Typography>{t('components.goBack')}</Typography>
      </Stack>
    </Button>
  )
}

export default GoBack
