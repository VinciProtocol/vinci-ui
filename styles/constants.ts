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
  width: {
    LESM: (lesm: string, gemd: string) => {
      return {
        width: {
          xs: lesm,
          sm: lesm,
          md: gemd,
          lg: gemd,
          xl: gemd,
        },
      }
    },
  },
}
