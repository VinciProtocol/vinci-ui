import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

export default function LinearButton() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="linear">Primary</Button>
      <Button variant="linear" disabled>
        Disabled
      </Button>
      <Button variant="linear" href="#linear-buttons">
        Link
      </Button>
    </Stack>
  )
}
