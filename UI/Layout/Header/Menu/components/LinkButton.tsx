import type { FC } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'

export type LinkButtonProps = Record<'label' | 'linkTo' | 'target' | 'key', string>
const LinkButton: FC<LinkButtonProps> = ({ linkTo, target, label }) => {
  return (
    <Link href={linkTo} passHref>
      <Button
        href={linkTo}
        target={target}
        variant="text"
        sx={{
          color: 'primary.contrastText',
        }}
        size="large"
      >
        {label}
      </Button>
    </Link>
  )
}

export default LinkButton
