import type { FC } from 'react'
import { Fragment } from 'react'
import Link from 'next/link'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import type { BasicMenuProps } from './BasicMenu'

export type LinkButtonMobileProps = BasicMenuProps & {
  handleClose: () => void
  currentMenu: any
}

const LinkMenuItem: FC<Omit<LinkButtonMobileProps, 'menuChildren'>> = ({
  linkTo,
  target,
  label,
  currentMenu,
  handleClose,
  key,
}) => {
  return (
    <Link href={linkTo} key={linkTo} passHref>
      <a target={target}>
        <ListItem button selected={currentMenu.key === key} onClick={handleClose}>
          <ListItemText primary={label} style={{ color: 'rgba(0, 0, 0, 0.87)' }} />
        </ListItem>
      </a>
    </Link>
  )
}

const LinkButtonMobile: FC<LinkButtonMobileProps> = (props) => {
  const { menuChildren, handleClose, currentMenu } = props
  if (!menuChildren) return <LinkMenuItem {...props} />
  return (
    <Fragment>
      {menuChildren.map((menu) => (
        <LinkMenuItem
          key={menu.linkTo}
          {...{
            ...menu,
            handleClose,
            currentMenu,
          }}
        />
      ))}
    </Fragment>
  )
}

export default LinkButtonMobile
