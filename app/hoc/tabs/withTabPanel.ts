import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import { useMemo } from 'react'
import type { Theme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import type { StyledComponent } from '@mui/styled-engine'
import type { MUIStyledCommonProps } from '@mui/system'

type WithTabPanelOptions = {
  tabpanelKey: string
}

type WithTabPanelProps<T> = {
  tabpanelValue: string
} & T

export type TabPanelBaseProps = {
  TabPanel?: StyledComponent<
    MUIStyledCommonProps<Theme>,
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    {}
  >
}

export const withTabPanel = <T extends TabPanelBaseProps>(
  tabPanel: (props: T) => JSX.Element,
  { tabpanelKey }: WithTabPanelOptions
) => {
  return (props: WithTabPanelProps<T>) => {
    const TabPanel = useMemo(
      () =>
        styled('div')(() => ({
          display: props.tabpanelValue === tabpanelKey ? 'block' : 'none',
        })),
      [props.tabpanelValue]
    )
    return tabPanel({
      ...props,
      TabPanel: TabPanel,
    })
  }
}
