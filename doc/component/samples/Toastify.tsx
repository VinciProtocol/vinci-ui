import * as React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

import { ToastContainer, toast } from 'lib/toastify'

export default function CustomizedToastify() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <Button onClick={() => toast('🦄 Wow so easy !')}>Toastify</Button>
          <Button
            onClick={() =>
              toast('🦄 Wow so easy !', {
                position: toast.POSITION.BOTTOM_RIGHT,
              })
            }
          >
            {toast.POSITION.BOTTOM_RIGHT}
          </Button>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <Button onClick={() => toast.info('🦄 Wow so easy !', { autoClose: false })}>no auto close</Button>
          <Button
            onClick={() => {
              const functionThatReturnPromise = () => new Promise((resolve) => setTimeout(resolve, 3000))
              toast.promise(functionThatReturnPromise, {
                pending: 'Promise is pending',
                success: 'Promise resolved 👌',
                error: 'Promise rejected 🤯',
              })
            }}
          >
            Promise
          </Button>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <Button color="info" onClick={() => toast.info('🦄 Wow so easy !')}>
            info
          </Button>
          <Button color="primary" onClick={() => toast.primary('🦄 Wow so easy !')}>
            primary
          </Button>
          <Button color="secondary" onClick={() => toast.secondary('🦄 Wow so easy !')}>
            secondary
          </Button>
          <Button color="success" onClick={() => toast.success('🦄 Wow so easy !')}>
            success
          </Button>
          <Button color="error" onClick={() => toast.error('🦄 Wow so easy !')}>
            error
          </Button>
          <Button color="warning" onClick={() => toast.warning('🦄 Wow so easy !')}>
            warning
          </Button>
        </Stack>
      </Stack>
    </React.Fragment>
  )
}
