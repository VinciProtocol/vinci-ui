import type { FC } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { selectPageProgress } from 'store/progress/page'
import { PROGRESS_STATUS } from './helpers'

const NProgress: FC = () => {
  const ROOT = useMemoEmpty(
    () => styled(Box)`
      width: 100%;
      position: absolute;
      bottom: 0;
    `
  )
  const { value, status } = useSelector(selectPageProgress) || {}
  if (status === PROGRESS_STATUS.ready) return null
  return (
    <ROOT>
      <LinearProgress variant="determinate" value={value} />
    </ROOT>
  )
}

export default NProgress
