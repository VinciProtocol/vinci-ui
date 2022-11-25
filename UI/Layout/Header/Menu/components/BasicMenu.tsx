import type { FC } from 'react'
import { useState, Fragment } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import type { LinkButtonProps } from './LinkButton'
import LinkButton from './LinkButton'

export type BasicMenuProps = LinkButtonProps & {
  menuChildren: LinkButtonProps[]
}
const BasicMenu: FC<BasicMenuProps> = ({ menuChildren, ...props }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  if (!menuChildren) return <LinkButton {...props} />
  const { label } = props
  return (
    <Fragment>
      <Button
        onClick={handleClick}
        variant="text"
        sx={{
          color: 'primary.contrastText',
        }}
        size="large"
      >
        {label}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuChildren.map(({ linkTo, target, label }) => (
          <Link href={linkTo} key={linkTo} passHref>
            <a target={target}>
              <MenuItem onClick={handleClose} style={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                {label}
              </MenuItem>
            </a>
          </Link>
        ))}
      </Menu>
    </Fragment>
  )
}

export default BasicMenu
