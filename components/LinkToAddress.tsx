import type { FC } from 'react'
import { useMemo } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import { useWallet } from 'app/wallet'
import { safeGet } from 'utils/get'
import { textCenterEllipsis } from 'utils/string/text-center-ellipsis'

type LinkToAddressProps = {
  address: string
}

const LinkToAddress: FC<LinkToAddressProps> = ({ address }) => {
  const { network } = useWallet()
  const linkTo = useMemo(() => {
    return safeGet(() => `${network.explorerUrl}/search?f=0&q=${address}`) || '#'
  }, [address, network?.explorerUrl])
  return (
    <Link href={linkTo} passHref>
      <Button
        variant="text"
        href=""
        target="_blank"
        sx={{
          color: 'primary',
        }}
      >
        {textCenterEllipsis(address)}
      </Button>
    </Link>
  )
}

export default LinkToAddress
