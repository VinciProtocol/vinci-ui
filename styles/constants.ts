export const RESPONSIVE_DESIGN = {
  display: {
    XS: (display = 'block') => {
      return {
        display: {
          xs: display,
          sm: 'none',
          md: 'none',
          lg: 'none',
          xl: 'none',
        },
      }
    },
    NEXS: (display = 'block') => {
      return {
        display: {
          xs: 'none',
          sm: display,
          md: display,
          lg: display,
          xl: display,
        },
      }
    },
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
    set: <T extends string>(xs: T, sm: T, md: T, lg: T, xl: T) => ({
      width: {
        xs,
        sm,
        md,
        lg,
        xl,
      },
    }),
    LESM: (lesm: string, gemd: string) => ({
      width: {
        xs: lesm,
        sm: lesm,
        md: gemd,
        lg: gemd,
        xl: gemd,
      },
    }),
  },
}
