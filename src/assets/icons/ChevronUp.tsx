import { SVGProps, memo } from 'react'
export const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" {...props}>
    <path
      fill="#fff"
      d="M9.8 7.3a.5.5 0 0 1-.8.3L6.3 5.4 3.6 7.6a.5.5 0 0 1-.7-.1.5.5 0 0 1 0-.7l3-2.5a.5.5 0 0 1 .7 0l3 2.5a.5.5 0 0 1 .2.5Z"
    />
  </svg>
)

export const ChevronUp = memo(SvgComponent)
