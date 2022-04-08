import { styled } from '@mui/material/styles'

export const ROOT = styled('div')`
  height: 100%;
  width: 100%;
  .MuiTable-root,
  .MuiTableHead-root,
  .MuiTableBody-root {
    display: block;
  }
  .ReactVirtualized__Table__headerRow,
  .ReactVirtualized__Table__rowColumn {
    display: flex;
  }
  .MuiTableCell-root {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    flex: 1;
  }

  .MuiTableCell-alignCenter {
    justify-content: center;
  }

  .ReactVirtualized__Table__row {
    display: flex;
    will-change: transform;
    &:hover {
      ${({ theme }) => ({
        backgroundColor: theme.palette.background.papers.primary,
        cursor: 'pointer',
      })}
    }
  }
`
export default ROOT
