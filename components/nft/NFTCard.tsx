import type { FC } from 'react'
import { useMemo, Fragment } from 'react'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import LockClockSharpIcon from '@mui/icons-material/LockClockSharp'

import type { NFT } from 'UI/BorrowDetail/types'
import NumberDisplay from 'components/math/NumberDisplay'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { valueToBigNumber } from 'utils/math'
import { useTheme } from '@mui/system'

export type NFTCardProps = Partial<
  NFT & {
    action: { name: string; onClick: any; disabled?: boolean; tip?: any }
    currentFloorPrice: string
    valuation: string
    onCheckChange: any
  }
>

const NFTCard: FC<NFTCardProps> = ({
  id,
  description,
  image,
  action,
  currentFloorPrice,
  onCheckChange,
  valuation,
  lock,
}) => {
  const Root = useMemoEmpty(
    () =>
      styled(Card)`
        width: 230px;
        position: relative;
        .checkbox {
          position: absolute;
          right: 0;
          top: 0;
        }
      `
  )
  const { t } = useTranslation()
  const [checked, setChecked] = useState(false)
  const title = useMemo(() => (id ? `${description} #${id}` : description), [description, id])
  const isLocked = useMemo(() => {
    const now = Date.now()
    return lock && lock.expiration > now
  }, [lock])
  const displayCheckBox = useMemo(() => !!onCheckChange && !isLocked, [isLocked, onCheckChange])
  const actions = useMemo(() => {
    if (!action) return null
    const { tip, disabled, onClick, name } = action
    if (tip) return tip

    if (isLocked) return <LockCountdown lock={lock} />

    return (
      <Button variant="outlined" disabled={disabled} onClick={() => onClick(id)}>
        {name}
      </Button>
    )
  }, [action, id, isLocked, lock])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked
    setChecked(value)
    onCheckChange(id, value)
  }
  return (
    <Root>
      {displayCheckBox && <Checkbox className="checkbox" checked={checked} onChange={handleChange} />}
      <CardMedia component="img" height="200" image={image} alt={description} />
      <CardContent>
        <Typography gutterBottom variant="body2" component="div">
          {title}
        </Typography>
        {currentFloorPrice && (
          <Fragment>
            <Typography component="div" variant="caption" color="text.secondary">
              {valuation || t('borrow-detail:NFT.valuation')}
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              <NumberDisplay value={currentFloorPrice} type="network" />
            </Typography>
          </Fragment>
        )}
      </CardContent>
      <Divider />
      <CardActions
        sx={{
          justifyContent: 'center',
          padding: 2,
        }}
      >
        {actions}
      </CardActions>
    </Root>
  )
}

const HOVER = 1000 * 60 * 60
const DAY = HOVER * 24
const LockCountdown: FC<Pick<NFTCardProps, 'lock'>> = ({ lock }) => {
  const now = Date.now()
  const { t } = useTranslation()
  const theme = useTheme()
  const timeInterval = valueToBigNumber(lock.expiration - now)
  let time = timeInterval.div(DAY)
  const days = Math.floor(time.toNumber()) || 0
  time = time.minus(days).multipliedBy(DAY).div(HOVER)
  const hovers = Math.floor(time.toNumber()) || 0
  return (
    <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
      <LockClockSharpIcon sx={{ fontSize: '30px', color: theme.palette.primary.main }} />
      <Stack spacing={0}>
        <Typography component="div" variant="caption" color="text.secondary">
          {t('nft-lockdrop-deposit:tabs.lockedNFT.lockTimeLeft.title')}
        </Typography>
        <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
          <Stack spacing={2} direction="row">
            <Stack spacing={1} direction="row">
              <span>{days}</span>
              <span>{t('nft-lockdrop-deposit:tabs.lockedNFT.lockTimeLeft.days')}</span>
            </Stack>
            <Stack spacing={1} direction="row">
              <span>{hovers}</span>
              <span>{t('nft-lockdrop-deposit:tabs.lockedNFT.lockTimeLeft.hovers')}</span>
            </Stack>
          </Stack>
        </Typography>
      </Stack>
    </Stack>
  )
}

export default NFTCard
