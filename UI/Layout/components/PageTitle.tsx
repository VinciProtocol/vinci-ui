import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

type PageTitleProps = {
  title: any
  subTitle?: any
}
const PageTitle: FC<PageTitleProps> = ({ title, subTitle }) => {
  const ROOT = useMemoEmpty(() =>
    styled(Stack)(({ theme }) => ({
      paddingTop: theme.spacing(2),
      ['a']: {
        color: theme.palette.primary.main,
      },
      ['.MuiTypography-subtitle1']: {
        color: theme.palette.text.secondary,
      },
    }))
  )
  return (
    <ROOT spacing={1}>
      <Typography variant="h4">{title}</Typography>
      {subTitle && (
        <Typography variant="subtitle1">
          <Stack spacing={1} direction="row">
            {subTitle}
          </Stack>
        </Typography>
      )}
    </ROOT>
  )
}

export default PageTitle
