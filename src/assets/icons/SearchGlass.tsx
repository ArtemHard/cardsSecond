import { SVGProps, Ref, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" ref={ref} {...props}>
    <path
      fill="#fff"
      d="m17.3 16-2.9-2.8a6.6 6.6 0 0 0 .3-7.7 6.7 6.7 0 1 0-1.4 9l2.8 2.8a.8.8 0 0 0 1.3-.3.8.8 0 0 0-.1-1ZM4.2 9.3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const SearchGlass = memo(ForwardRef)
