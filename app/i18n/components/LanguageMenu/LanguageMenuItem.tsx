import type { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { LanguageMenuItemProps } from './types'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'

const LanguageMenuItem: FC<LanguageMenuItemProps> = ({
  language: { name, flag, code, value },
  url,
  currentLanguageCode,
}) => (
  <Link href={url} locale={code} passHref>
    <MenuItem
      selected={currentLanguageCode === code}
      sx={{
        '.country-flag': {
          marginLeft: 1,
          width: 20,
          height: 20,
        },
      }}
    >
      <ListItemText>{value}</ListItemText>
      <div className="country-flag">{flag && <Image src={flag} alt={name} />}</div>
    </MenuItem>
  </Link>
)

export default LanguageMenuItem
