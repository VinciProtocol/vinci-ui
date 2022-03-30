import { keyframes, css } from '@emotion/react'

export const keyframeCSS = css`
  @keyframes keyframe {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

export const keyframe = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`

export default keyframe
