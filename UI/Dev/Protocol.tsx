import type { FC } from 'react'
import { useMemo } from 'react'
import Button from '@mui/material/Button'

import { DevCard } from './components/DevCard'

export const Protocol: FC = () => {
  const data = useMemo(() => {
    return [
      {
        path: '/api/protocol/generate',
        description: '根据 lib/protocol/src, 更新合约地址',
        action: (
          <Button
            onClick={() => {
              console.log(fetch('/api/protocol/generate'))
            }}
          >
            执行
          </Button>
        ),
      },
      {
        path: '/api/protocol/console',
        description: '启动 Hardhat 控制台',
        action: (
          <Button
            onClick={() => {
              console.log(fetch('/api/protocol/console'))
            }}
          >
            执行
          </Button>
        ),
      },
    ]
  }, [])

  return (
    <DevCard
      {...{
        title: 'Protocol',
        data,
      }}
    />
  )
}
