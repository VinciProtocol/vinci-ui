import * as React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}))

export default function Elevation() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box
          sx={{
            p: 2,
            bgcolor: 'background.default',
            display: 'grid',
            gridTemplateColumns: { md: '1fr 1fr' },
            gap: 2,
          }}
        >
          {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
            <Item key={elevation} elevation={elevation}>
              {`elevation=${elevation}`}
            </Item>
          ))}

          <Item variant="primary">primary</Item>
          <Item variant="secondary">secondary</Item>
          <Item variant="card">card</Item>
        </Box>
      </Grid>
    </Grid>
  )
}
