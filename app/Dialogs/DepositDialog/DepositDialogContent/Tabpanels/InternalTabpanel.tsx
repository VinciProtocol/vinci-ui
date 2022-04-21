import { useTranslation } from 'next-i18next'

import { styled } from '@mui/material/styles'
import { NumberInput } from 'components/math/NumberInput'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import { grey } from '@mui/material/colors'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import type { UseTabpanelReturnValue } from 'app/Dialogs/tabpanel/helpers'
import NumberDisplay from 'components/math/NumberDisplay'

const InternalTabpanel = (props: UseTabpanelReturnValue) => {
  const { t } = useTranslation()
  const {
    ROOT,
    actions,
    title,
    inputSlider: { input, slider },
    info,
  } = props

  const ActionButton = useMemoEmpty(
    () => styled(Button)`
      width: 100%;
    `
  )

  const TabpanelPaper = useMemoEmpty(() =>
    styled(Paper)(({ theme }) => ({
      padding: theme.spacing(2),
    }))
  )

  return (
    <ROOT>
      <Stack spacing={2}>
        <Stack spacing={1}>
          <Typography variant="body2">
            {title.text}: {title.balance} {title.symbol}
          </Typography>
          <NumberInput value={input.value} disabled={input.disabled} onChange={input.onChange} onMax={input.onMax} />
        </Stack>

        <TabpanelPaper variant="primary">
          <Stack spacing={1}>
            <Grid container>
              <Grid item xs={6}>
                <Stack>
                  <Typography variant="caption" color={grey[500]}>
                    {t('lend:lendingPools.APY')}
                  </Typography>
                  <Typography variant="body1">
                    <NumberDisplay value={info.APY} options="percent" />
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack>
                  <Typography component="p" variant="caption" color={grey[500]} textAlign="right">
                    {t('lend:lendingPools.deposited')}
                  </Typography>
                  <Typography variant="body1" textAlign="right">
                    <NumberDisplay value={info.balanceInUSD} options="USD" />
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </TabpanelPaper>

        <Stack spacing={1}>
          <Typography variant="caption">{t('lend:lendingPools.ratio')}</Typography>
          <Slider value={slider.value} disabled={slider.disabled} onChange={slider.onChange} />
        </Stack>

        <Stack spacing={2} direction="row">
          <ActionButton variant="outlined" disabled={actions.cancel.disabled} onClick={actions.cancel.onClick}>
            {t('common:wallet.btn.cancel')}
          </ActionButton>
          <ActionButton variant="linear" disabled={actions.confirm.disabled} onClick={actions.confirm.onClick}>
            {t(`common:wallet.btn.${actions.text}`)}
          </ActionButton>
        </Stack>
      </Stack>
    </ROOT>
  )
}

export default InternalTabpanel
