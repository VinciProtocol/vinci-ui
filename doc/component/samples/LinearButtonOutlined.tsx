import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

export default function LinearButtonOutlined() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="linearOutlined">Primary</Button>
      <Button variant="linearOutlined" disabled>
        Disabled
      </Button>
      <Button variant="linearOutlined" href="#linear-buttons">
        Link
      </Button>
    </Stack>
  )
}
