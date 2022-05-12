import type { FC } from 'react'
import { styled } from '@mui/material/styles'

const RingLoading: FC = () => {
  return (
    <Ring>
      <RingAnimation />
    </Ring>
  )
}

const Ring = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  width: 88,
  height: 88,
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  borderColor: 'transparent',
  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
}))

const RingAnimation = styled('div')`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 88.63%;
  height: 88.63%;
  margin: 5px;
  border: 2px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default RingLoading
