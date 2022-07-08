import type { FC } from 'react'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import PCDashboard from './PCDashboard'
import MobileDashboard from './MobileDashboard'

const Dashboard: FC = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const Content = useMemoEmpty(() =>
    styled(Container)(() => ({
      minHeight: 'calc(100vh - 256px)',
    }))
  )

  return <Content>{matches ? <PCDashboard /> : <MobileDashboard />}</Content>
}

export default Dashboard
