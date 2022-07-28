import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'

import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Select from '@mui/material/Select'
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
import { useContractData } from 'domains'
import { cloneDeep } from 'lodash'
import { valueToBigNumber } from 'utils/math'
import { useMemoEmpty } from 'app/hooks/useMemoEmpty'
import { RESPONSIVE_DESIGN } from 'styles/constants'
import MultipleSelect from 'components/MultipleSelect'

export const useTableSearch = () => {
  const theme = useTheme()
  const { generalAssets } = useContractData()
  const ROOT = useMemoEmpty(() => styled(Stack)``)

  const input = useInput(generalAssets)
  const searchCollections = useSearchCollections(input.data)
  const sort = useSort(searchCollections.data)
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const data = useMemo(() => {
    if (!sort.data) return []
    const returnValue = cloneDeep(sort.data)
    return returnValue
  }, [sort])

  const content = useMemo(
    () =>
      matches ? (
        <ROOT paddingX={2} direction="row" justifyContent="space-between">
          {input.content}
          <Stack spacing={2} direction="row">
            {searchCollections.content}
            {sort.content}
          </Stack>
        </ROOT>
      ) : (
        <ROOT spacing={2}>
          {input.content}
          {searchCollections.content}
          {sort.content}
        </ROOT>
      ),
    [ROOT, input.content, matches, searchCollections.content, sort.content]
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

const useSort = (sourceData: any[]) => {
  const { t } = useTranslation('lend')
  const [value, onChange] = useState('APY-desc')

  const data = useMemo(() => {
    if (!sourceData) return []
    const returnValue = cloneDeep(sourceData)
    const [dataKey, order] = value.split('-')
    const asc = (a: any, b: any) => valueToBigNumber(a[dataKey]).minus(b[dataKey]).toNumber()
    const sortFn = order === 'asc' ? asc : (a: any, b: any) => asc(b, a)
    return returnValue.sort(sortFn)
  }, [sourceData, value])

  const content = useMemo(
    () => (
      <FormControl sx={RESPONSIVE_DESIGN.width.LESM('100%', '200px')} size="small">
        <InputLabel>{t('common:components.table.sort.title')}</InputLabel>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          label={t('common:components.table.sort.title')}
        >
          {[
            'APY-desc',
            'APY-asc',
            'totalSupply-desc',
            'totalSupply-asc',
            'totalBorrowed-desc',
            'totalBorrowed-asc',
          ].map((key) => {
            const [dataKey, order] = key.split('-')
            return (
              <MenuItem value={key} key={key}>
                <ListItemText
                  sx={{ margin: 0 }}
                  primary={`${t('lendingPools.' + dataKey)}: ${t(`common:components.table.sort.${order}`)}`}
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    ),
    [value, t]
  )

  return {
    data,
    content,
  }
}
