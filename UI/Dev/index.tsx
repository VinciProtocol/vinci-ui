import type { FC } from 'react'
import { Fragment } from 'react'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import Header from 'UI/Layout/Header'

// import MuiComponentSamples from 'doc/component/MuiComponentSamples'

import { Log } from './Log'
import { I18n } from './I18n'
import { Protocol } from './Protocol'

const Dev: FC = () => {
  const Content = useMemoEmpty(() =>
    styled(Container)(({ theme }) => ({
      marginTop: theme.spacing(4),
    }))
  )

  return (
    <Fragment>
      <Header />
      <Content>
        <Stack spacing={2}>
          <Log />
          <I18n />
          <Protocol />
        </Stack>
      </Content>
      {/* <MuiComponentSamples /> */}
    </Fragment>
  )
}

export default Dev
