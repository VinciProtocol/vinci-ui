import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

export function NumberInput({ value, onChange, disabled, onBlur, error, onMax }: any) {
  return (
    <FormControl error={error} variant="standard">
      <Paper
        component="div"
        variant="outlined"
        sx={{ padding: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
      >
        <InputBase
          aria-describedby="helper-text"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          sx={{ ml: 1, flex: 1 }}
          placeholder="0.00"
          inputProps={{ 'aria-label': 'input number', pattern: '^[0-9]*[.,]?[0-9]*$' }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Button disabled={disabled} onClick={onMax}>
          Max
        </Button>
      </Paper>
      <FormHelperText id="helper-text">{error}</FormHelperText>
    </FormControl>
  )
}
