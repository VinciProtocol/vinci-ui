import { keyframes, css } from '@emotion/react'

export const keyframeCSS = css`
  @keyframes keyframe {
    from,
    20%,
    53%,
    80%,
    to {
      transform: translate3d(0, 0, 0);
    }

    40%,
    43% {
      transform: translate3d(0, -30px, 0);
    }

    70% {
      transform: translate3d(0, -15px, 0);
    }

    90% {
      transform: translate3d(0, -4px, 0);
    }
  }
`

export const keyframe = keyframes`
from,
20%,
53%,
80%,
to {
  transform: translate3d(0, 0, 0);
}

40%,
43% {
  transform: translate3d(0, -30px, 0);
}

70% {
  transform: translate3d(0, -15px, 0);
}

90% {
  transform: translate3d(0, -4px, 0);
}
`

export default keyframe
