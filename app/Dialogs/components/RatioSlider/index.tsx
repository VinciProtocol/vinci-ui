import type { FC } from 'react'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

type RatioSliderProps = {
  slider: {
    value: number
    onChange: (e: Event, value: any) => void
    disabled: boolean
  }
}

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 25,
    label: '25%',
  },
  {
    value: 50,
    label: '50%',
  },
  {
    value: 75,
    label: '75%',
  },
  {
    value: 100,
    label: '100%',
  },
]

const getAriaValueText = (value: number) => {
  return `${value}%`
}

const RatioSlider: FC<RatioSliderProps> = ({ slider }) => {
  const ROOT = useMemoEmpty(() => styled('div')`
    padding: 0 12px;
  `)
  return (
    <ROOT>
      <Slider
        getAriaValueText={getAriaValueText}
        value={slider.value}
        disabled={slider.disabled}
        onChange={slider.onChange}
        marks={marks}
      />
    </ROOT>
  )
}

export default RatioSlider
