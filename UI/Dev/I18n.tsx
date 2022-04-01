import type { FC } from 'react'
import { useMemo } from 'react'
import Button from '@mui/material/Button'

import { DevCard } from './components/DevCard'

export const I18n: FC = () => {
  const data = useMemo(() => {
    return [
      {
        path: '/api/i18n/generate',
        description: '根据 app/i18n/locales 目录, 更新文案',
        action: (
          <Button
            onClick={() => {
              console.log(fetch('/api/i18n/generate'))
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
        title: 'I18n',
        data,
      }}
    />
  )
}
