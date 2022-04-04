import React from 'react'
import { Typography, Paper, Button, Grid } from '@mui/material'

import { styled } from '@mui/material/styles'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'

import componentSamples from './samples'

const MuiComponentSamples = () => {
  const ROOT = useMemoEmpty(
    () =>
      styled(Paper)`
        width: 100%;
        height: 100%;

        .root {
          ${({ theme }) => ({
            maxWidth: 1000,
            padding: theme.spacing(),
            margin: 'auto',
          })}
        }
        .title {
          justify-content: space-between;
        }
        .sample {
          margin-bottom: 20px;
        }
        .sampleItem {
          ${({ theme }) => ({
            marginBottom: theme.spacing(10),
            width: '100%',
            maxWidth: 1000,
            paddingLeft: theme.spacing(4),
            margin: 'auto',
          })}
        }
        .docsButton {
          ${({ theme }) => ({
            marginLeft: theme.spacing(2),
          })}
        }
      `
  )

  return (
    <ROOT>
      <div className="root">
        <Typography variant="h4" gutterBottom>
          Material-UI Components
        </Typography>
        {componentSamples.map(({ id, title, component, docs }) => (
          <div key={id} id={id} className="sample">
            <Grid container className="title" alignItems="center">
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>
              <Button variant="outlined" color="secondary" size="small" href={docs} target="_blank" rel="noreferrer">
                Docs
              </Button>
            </Grid>
            <div className="sampleItem">{component}</div>
          </div>
        ))}
      </div>
    </ROOT>
  )
}

export default MuiComponentSamples
