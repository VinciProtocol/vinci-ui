import type { MouseEvent } from 'react'
import { useState, useMemo, useRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { useContractNFT, useThegraph } from 'domains'

import { valueToBigNumber } from 'utils/math'
import { safeGet } from 'utils/get'

import type { FloorPriceTrendsChartProps } from './types'
import { cloneDeep } from 'lodash'

const DayButtonList = [7, 14, 30, 90]
const useDayButton = () => {
  const [value, setValue] = useState(7)
  return {
    value,
    onChange: (event: MouseEvent<HTMLElement>, newValue: number) => {
      if (!newValue) return
      setValue(newValue)
    },
    list: DayButtonList,
  }
}

export const useChart = () => {
  const lineChart = useRef({ width: 0, height: 0, gradient: undefined })
  const theme = useTheme()
  const { nft } = useContractNFT()
  const { oracleRecords } = useThegraph()
  const dayButton = useDayButton()

  const data = useMemo(() => {
    if (!oracleRecords || !nft || !oracleRecords[nft.NFT_ID]) return []
    const returnValue = cloneDeep(oracleRecords[nft.NFT_ID])
    const { length } = returnValue
    if (length < dayButton.value) return returnValue
    const startIndex = length - dayButton.value
    return returnValue.slice(startIndex, length)
  }, [dayButton.value, nft, oracleRecords])

  const change24 = useMemo(() => {
    return (
      safeGet(() =>
        valueToBigNumber(data[data.length - 1].y)
          .div(data[data.length - 2].y)
          .minus(1)
      ) || 0
    )
  }, [data])

  const props = useMemo(
    () =>
      ({
        height: 60,
        data: {
          datasets: [
            {
              label: nft?.collection,
              data,
              backgroundColor: (context) => {
                const chart = context.chart
                const { ctx, chartArea } = chart
                if (!chartArea) return null
                const chartWidth = chartArea.right - chartArea.left
                const chartHeight = chartArea.bottom - chartArea.top
                if (!chartWidth) return null
                const { width, height } = lineChart.current
                let { gradient } = lineChart.current
                if (width !== chartWidth || height !== chartHeight) {
                  gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
                  gradient.addColorStop(0, 'rgb(249, 68, 50, 0)')
                  gradient.addColorStop(0.5, 'rgba(249, 68, 50, 0.5)')
                  gradient.addColorStop(1, 'rgba(249, 68, 50, 1)')
                  lineChart.current = {
                    width: chartWidth,
                    height: chartHeight,
                    gradient,
                  }
                }
                return gradient
              },
              fill: 'start',
              borderColor: theme.palette.primary.main,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return ` ${context.parsed.y} ETH`
                },
                title: (context) => {
                  return `${context[0].label.split(',').slice(0, -1)}`
                },
              },
            },
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
              },
              ticks: {
                display: false,
              },
              grid: {
                display: false,
              },
            },
            y: {
              position: 'right',
              grid: {
                display: true,
              },
              ticks: {
                color: theme.palette.text.secondary,
              },
            },
          },
        },
      } as FloorPriceTrendsChartProps),
    [data, nft?.collection, theme.palette.primary.main, theme.palette.text.secondary]
  )

  return { props, dayButton, change24, currentFloorPrice: nft.currentFloorPrice }
}
