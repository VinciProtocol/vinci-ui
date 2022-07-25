import { cloneDeep } from 'lodash'
import { useMemo } from 'react'

import { useAppSelector } from 'store'
import { valueToBigNumber } from 'utils/math'

import { selectData } from '..'

const HOVER = 1000 * 60 * 60
const HalfDay = HOVER * 12
const DAY = HalfDay * 2

const getUTCTime = (date: any): number => {
  date = new Date(date)
  date.setUTCHours(12, 0, 0, 0)
  return date.getTime()
}

export const useOracleRecords = () => {
  const data = useAppSelector(selectData)

  const oracleRecords = useMemo(() => {
    if (!data || !data.length) return
    const source = cloneDeep(data)
    const startTime = getUTCTime(valueToBigNumber(source[0].createTime).multipliedBy(1000).toNumber())
    const endTime = getUTCTime(new Date())
    const returnValue = []

    let index = 0
    for (let time = startTime; time <= endTime; time += DAY) {
      if (source[index]) {
        let createTime = 0
        do {
          createTime = parseInt(source[index].createTime) * 1000
        } while (createTime - time < HalfDay && source[++index])
      }
      returnValue.push({
        ...source[index - 1],
        createTime: time,
      })
    }

    return returnValue
  }, [data])

  return oracleRecords
}
