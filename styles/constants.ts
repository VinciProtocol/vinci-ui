export const RESPONSIVE_DESIGN = {
  display: {
    LESM: (display = 'block') => {
      return {
        display: {
          xs: display,
          sm: display,
          md: 'none',
          lg: 'none',
          xl: 'none',
        },
      }
    },
    GEMD: (display = 'block') => {
      return {
        display: {
          xs: 'none',
          sm: 'none',
          md: display,
          lg: display,
          xl: display,
        },
      }
    },
  },
}
