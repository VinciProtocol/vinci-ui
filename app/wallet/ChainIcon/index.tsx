import type { FC } from 'react'
import Image from 'next/image'
import BSC from './images/bsc.svg'
import Ethereum from './images/ethereum.svg'
import CircleIcon from '@mui/icons-material/FiberManualRecordRounded'

interface ChainIconProps {
  chainName: string
}

export const ChainIcon: FC<ChainIconProps> = ({ chainName }) => {
  const getNetworkIcon = (name: string) => {
    switch (name) {
      case 'Ethereum':
        return <Image src={Ethereum} alt={name} width={16} height={16}/>
      case 'BSC':
        return <Image src={BSC} alt={name} width={16} height={16}/>
      case 'Kovan':
        return <CircleIcon fontSize="small" sx={{ color: '#9064ff' }} />
      default:
        return <CircleIcon fontSize="small" sx={{ color: 'grey' }} />
    }
  }

  return getNetworkIcon(chainName)
}

export default ChainIcon
