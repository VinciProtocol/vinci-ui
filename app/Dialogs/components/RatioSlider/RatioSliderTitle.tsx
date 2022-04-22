import type { FC } from 'react'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

type RatioSliderTitleProps = {
  slider: {
    value: number
  }
  title: string
}

const RatioSliderTitle: FC<RatioSliderTitleProps> = ({ title, slider }) => {
  const ROOT = useMemoEmpty(
    () => styled('div')`
      display: flex;
      justify-content: space-between;
    `
  )
  return (
    <ROOT>
      <Typography variant="caption">{title}</Typography>
      <Typography variant="caption">{Math.round(slider.value) + '%'}</Typography>
    </ROOT>
  )
}

export default RatioSliderTitle
