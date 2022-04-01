import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import GitHubIcon from '@mui/icons-material/GitHub'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import TelegramIcon from '@mui/icons-material/Telegram'
import TwitterIcon from '@mui/icons-material/Twitter'
import EmailIcon from '@mui/icons-material/Email'

const Links = () => {
  const ROOT = useMemoEmpty(
    () => styled('div')`
      display: flex;
      align-items: center;
    `
  )

  const MediumSVG = () => {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.846 6.887C2.876 6.592 2.763 6.301 2.543 6.103L0.303 3.403V3H7.261L12.639 14.795L17.367 3H24V3.403L22.084 5.24C21.919 5.366 21.837 5.573 21.871 5.778V19.276C21.837 19.48 21.919 19.687 22.084 19.813L23.955 21.65V22.053H14.543V21.65L16.482 19.768C16.672 19.578 16.672 19.522 16.672 19.231V8.321L11.283 22.009H10.555L4.28 8.321V17.495C4.228 17.88 4.356 18.269 4.627 18.547L7.148 21.605V22.009H0V21.605L2.521 18.547C2.791 18.268 2.911 17.877 2.846 17.495V6.887V6.887Z"
        />
      </svg>
    )
  }

  const MediumIcon = useMemoEmpty(
    () => styled('div')`
      display: flex;
      align-items: center;
      ${({ theme }) => ({
        color: theme.palette.grey[500],
        width: '20px',
        height: '20px',
      })}
    `
  )

  const links = [
    { label: 'Telegram', linkTo: 'https://t.me/vinciprotocol', icon: <TelegramIcon /> },
    { label: 'Twitter', linkTo: 'https://twitter.com/vinciprotocol', icon: <TwitterIcon /> },
    { label: 'Docs', linkTo: 'https://docs.vinci.io', icon: <MenuBookIcon /> },
    {
      label: 'Medium',
      linkTo: 'https://medium.com/@vinciprotoco',
      icon: (
        <MediumIcon>
          <MediumSVG />
        </MediumIcon>
      ),
    },
    { label: 'Github', linkTo: 'https://github.com/vinciprotocol', icon: <GitHubIcon /> },
    { label: 'Email', linkTo: 'mailto:info@vinci.io', icon: <EmailIcon /> },
  ]

  const list = links.map(({ label, linkTo, icon }) => (
    <Link href={linkTo} key={linkTo} target="_blank" underline="none" sx={{ padding: '0 10px' }}>
      <Button
        variant="text"
        sx={{
          color: 'grey.500',
        }}
        startIcon={icon}
        size="large"
      >
        {label}
      </Button>
    </Link>
  ))

  return <ROOT>{list}</ROOT>
}

export default Links
