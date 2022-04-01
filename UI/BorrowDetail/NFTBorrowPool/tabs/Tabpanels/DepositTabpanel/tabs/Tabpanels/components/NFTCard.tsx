import type { FC } from 'react'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Checkbox from '@mui/material/Checkbox'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import type { NFT } from 'UI/BorrowDetail/types'
import NumberDisplay from 'components/math/NumberDisplay'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

const NFTCard: FC<NFT & { action: { name: string; onClick: any }; currentFloorPrice: string; onCheckChange: any }> = ({
  id,
  description,
  image,
  action,
  currentFloorPrice,
  onCheckChange,
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
  const [checked, setChecked] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked
    setChecked(value)
    onCheckChange(id, value)
  }
  const { t } = useTranslation()
  return (
    <Root>
      <Checkbox className="checkbox" checked={checked} onChange={handleChange} />
      <CardMedia component="img" height="200" image={image} alt={description} />
      <CardContent>
        <Typography gutterBottom variant="body2" component="div">
          {description} #{id}
        </Typography>
        <Typography component="div" variant="caption" color="text.secondary">
          {t('borrow-detail:NFT.valuation')}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          <NumberDisplay value={currentFloorPrice} type="ETH" />
        </Typography>
      </CardContent>
      <Divider />
      <CardActions
        sx={{
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <Button variant="outlined" onClick={() => action.onClick(id)}>
          {action.name}
        </Button>
      </CardActions>
    </Root>
  )
}

export default NFTCard
