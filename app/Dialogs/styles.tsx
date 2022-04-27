import type { FC } from 'react'
import Box from '@mui/material/Box'

import { RESPONSIVE_DESIGN } from 'styles/constants'

export const ROOT: FC = (props) => {
  return (
    <Box
      sx={[
        {
          position: 'relative',
        },
        (theme) =>
          RESPONSIVE_DESIGN.width.set(
            theme.spacing(32),
            theme.spacing(60),
            theme.spacing(60),
            theme.spacing(60),
            theme.spacing(60)
          ),
      ]}
    >
      {props.children}
    </Box>
  )
}
