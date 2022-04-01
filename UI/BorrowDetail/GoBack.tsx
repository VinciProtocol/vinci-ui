import type { FC } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const GoBack: FC = () => {
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <Button
      sx={{
        width: '120px',
      }}
      onClick={() =>
        router.push({
          pathname: '/borrow',
        })
      }
    >
      <Stack spacing={2} direction="row">
        <ArrowBackIcon />
        <Typography>{t('borrow-detail:goBack')}</Typography>
      </Stack>
    </Button>
  )
}

export default GoBack
