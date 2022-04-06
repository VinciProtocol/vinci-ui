import type React from 'react'
import { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'

export type TabInputSliderProps = {
  balance: BigNumber
}

export const useInputSlider = ({ balance }: TabInputSliderProps) => {
  const [inputData, setInputData] = useState({
    value: '',
    errors: [],
  })
  const [sliderValue, setSliderValue] = useState(0)
  const disabled = useMemo(() => !balance || balance.isNaN() || balance.eq(0), [balance])

  const inputOnChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (disabled) return
      if (!e.currentTarget.validity.valid) return
      const targetValue = e.target.value
      const bgValue = new BigNumber(targetValue || 0)
      if (bgValue.isNaN()) return

      if (balance.isLessThan(bgValue)) {
        setInputData({
          value: balance.toString(),
          errors: [],
        })
        setSliderValue(100)
      } else {
        setInputData({
          value: targetValue,
          errors: [],
        })
        setSliderValue(bgValue.div(balance).multipliedBy(100).toNumber())
      }
    },
    [balance, disabled]
  )
  const inputOnMax: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (disabled) return
    setInputData({
      value: balance.toString(),
      errors: [],
    })
    setSliderValue(100)
  }, [balance, disabled])
  const inputClear = useCallback(() => {
    setInputData({
      value: '',
      errors: [],
    })
    setSliderValue(0)
  }, [])
  const input = useMemo(
    () => ({
      ...inputData,
      onChange: inputOnChange,
      onMax: inputOnMax,
      clear: inputClear,
      disabled,
    }),
    [disabled, inputClear, inputData, inputOnChange, inputOnMax]
  )

  const sliderOnChange = useCallback(
    (e: Event, value: any) => {
      if (!balance) return
      setSliderValue(value)
      setInputData({
        value: balance.multipliedBy(value).div(100).toString(),
        errors: [],
      })
    },
    [balance]
  )

  const slider = useMemo(
    () => ({
      value: sliderValue,
      onChange: sliderOnChange,
      disabled,
    }),
    [disabled, sliderOnChange, sliderValue]
  )

  return { input, slider, max: balance }
}
export type UseInputSliderReturnValue = ReturnType<typeof useInputSlider>
