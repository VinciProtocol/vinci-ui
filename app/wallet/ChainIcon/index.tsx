import type { FC } from 'react'
import Image from 'next/image'
import BSC from './images/bsc.svg'
import CircleIcon from '@mui/icons-material/FiberManualRecordRounded';

interface ChainIconProps {
  chainName: string
}

export const ChainIcon: FC<ChainIconProps> = ({ chainName }) => {

  const getNetworkIcon = (name: string) => {
    switch (name) {
      case 'BSC':
        return <Image src={BSC} alt={name}/>
      case 'Kovan':
        return <CircleIcon fontSize='small' sx={{ color: '#9064ff' }} />
      default:
        return <CircleIcon fontSize='small' sx={{ color: 'grey' }} />
    }
  }

  return getNetworkIcon(chainName)
}

export default ChainIcon
