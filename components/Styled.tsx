import { styled } from '@mui/material/styles'

export const Title = styled('h5')(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.text.primary,
}))

export const SubTitle = styled('p')(({ theme }) => ({
  ...theme.typography.subtitle1,
  color: theme.palette.text.secondary,
}))

export const Caption = styled('span')(({ theme }) => ({
  ...theme.typography.caption,
  color: theme.palette.text.secondary,
}))
