import type { FC } from 'react'
import { useCallback } from 'react'
import clsx from 'clsx'

import type { SelectProps } from '@mui/material/Select'
import Select from '@mui/material/Select'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Typography from '@mui/material/Typography'

function MultipleSelect<T extends string[]>(selectProps: SelectProps<T>) {
  const IconComponent: FC<{ className?: string }> = useCallback(
    (props) => {
      if (selectProps.value && selectProps.value.length)
        return (
          <Typography color="text.secondary">
            <HighlightOffIcon
              className={clsx(props.className, 'close')}
              style={{
                pointerEvents: 'unset',
                cursor: 'pointer',
                color: 'inherit',
                fontSize: '1.25rem',
              }}
              onClick={(e) => {
                e.stopPropagation()
                selectProps.onChange({ target: { value: [] } } as any, undefined)
              }}
            />
          </Typography>
        )
      return <ArrowDropDownIcon className={clsx(props.className, 'arrow-drop')} />
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectProps.value]
  )

  return <Select {...selectProps} multiple IconComponent={IconComponent} />
}

export default MultipleSelect
