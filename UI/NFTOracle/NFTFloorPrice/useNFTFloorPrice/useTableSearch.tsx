import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'

import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import ListItemText from '@mui/material/ListItemText'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import ListItemIcon from '@mui/material/ListItemIcon'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone'

import { NFTIcon } from 'app/web3/TokenIcon'
import { useContractData, useThegraph } from 'domains'
import { cloneDeep } from 'lodash'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { RESPONSIVE_DESIGN } from 'styles/constants'
import MultipleSelect from 'components/MultipleSelect'
import { safeGet } from 'utils/get'

export const useTableSearch = () => {
  const theme = useTheme()
  const { oracleAssets } = useThegraph()
  const ROOT = useMemoEmpty(() => styled(Stack)``)
  const source = useMemo(
    () => oracleAssets.filter((oracleAssets) => safeGet(() => oracleAssets.reserves.length)),
    [oracleAssets]
  )

  const input = useInput(source)
  const searchCollections = useSearchCollections(input.data)
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const data = useMemo(() => {
    if (!searchCollections.data) return []
    const returnValue = cloneDeep(searchCollections.data)
    return returnValue
  }, [searchCollections])

  const content = useMemo(
    () =>
      matches ? (
        <ROOT paddingX={2} direction="row" justifyContent="space-between">
          {input.content}
          <Stack spacing={2} direction="row">
            {searchCollections.content}
          </Stack>
        </ROOT>
      ) : (
        <ROOT spacing={2}>
          {input.content}
          {searchCollections.content}
        </ROOT>
      ),
    [ROOT, input.content, matches, searchCollections.content]
  )

  return {
    data,
    content,
  }
}

const useInput = (sourceData: any[]) => {
  const { t } = useTranslation('lend')
  const [value, onChange] = useState('')
  const data = useMemo(() => {
    if (!sourceData) return []
    try {
      const regExp = new RegExp(value, 'i')
      return sourceData.filter((i) => regExp.test(i.collection))
    } catch (e) {
      return sourceData
    }
  }, [sourceData, value])

  const content = useMemo(
    () => (
      <TextField
        sx={RESPONSIVE_DESIGN.width.LESM('100%', '300px')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={t('common:components.table.collectionName')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" style={{ pointerEvents: 'none' }}>
              <SearchTwoToneIcon />
            </InputAdornment>
          ),
        }}
        size="small"
      />
    ),
    [t, value]
  )

  return {
    data,
    content,
  }
}

const useSearchCollections = (sourceData: any[]) => {
  const { t } = useTranslation('lend')
  const { generalAssets } = useContractData()

  const [values, setValues] = useState([])

  const data = useMemo(() => {
    if (!sourceData) return []
    if (!values.length) return sourceData
    return sourceData.filter((i) => values.find((v) => v === i.collection))
  }, [sourceData, values])

  const content = useMemo(() => {
    return (
      <FormControl sx={RESPONSIVE_DESIGN.width.LESM('100%', '200px')} size="small">
        <InputLabel>{t('common:components.table.collections')}</InputLabel>
        <MultipleSelect
          value={values}
          onChange={(e) => {
            const value = e.target.value
            setValues(typeof value === 'string' ? value.split(',') : value)
          }}
          input={<OutlinedInput label={t('common:components.table.collections')} />}
          renderValue={(selected) => selected.join(', ')}
        >
          {generalAssets.map((asset) => (
            <MenuItem key={asset.NFT_ID} value={asset.collection}>
              <ListItemIcon>
                <NFTIcon NFT_ID={asset.NFT_ID} sx={{ width: 30, height: 30 }} />
              </ListItemIcon>
              <ListItemText primary={asset.collection} primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          ))}
        </MultipleSelect>
      </FormControl>
    )
  }, [generalAssets, t, values])

  return {
    data,
    content,
  }
}
