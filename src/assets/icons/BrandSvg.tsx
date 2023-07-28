import { SVGProps, Ref, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={157} height={36} fill="none" ref={ref} {...props}>
    <path
      fill="#fff"
      d="M71 24.7c-1.3 0-2.5-.3-3.5-.8-1-.6-1.9-1.4-2.5-2.3-.5-1-.8-2.2-.8-3.4 0-1.3.3-2.4.8-3.4.6-1 1.5-1.8 2.5-2.3 1-.6 2.2-.9 3.5-.9 1.1 0 2 .2 3 .6a6 6 0 0 1 2.2 1.7l-1.9 1.7a4 4 0 0 0-3.1-1.5c-.8 0-1.5.2-2.1.6-.6.3-1.1.8-1.5 1.4-.3.6-.5 1.3-.5 2 0 .9.2 1.6.5 2.2.4.6.9 1 1.5 1.4.6.4 1.3.5 2 .5a4 4 0 0 0 3.2-1.5l1.9 1.8c-.6.7-1.4 1.3-2.2 1.6-1 .4-2 .6-3 .6Zm12.7 0c-1.8 0-3.2-.5-4.3-1.5-1-1-1.5-2.4-1.5-4.3v-7h3v7c0 2.2.9 3.3 2.8 3.3.9 0 1.6-.2 2-.8.5-.5.8-1.4.8-2.6v-7h2.9V19c0 1.9-.5 3.3-1.5 4.3s-2.4 1.5-4.2 1.5Zm17.8-6.7c.7.2 1.3.5 1.7 1 .4.6.6 1.3.6 2a3 3 0 0 1-1.3 2.6c-.8.6-2 .9-3.7.9h-6.6V11.9h6.2a6 6 0 0 1 3.5.8c.9.6 1.3 1.4 1.3 2.4a3 3 0 0 1-1.7 2.8Zm-6.4-4v3h3a3 3 0 0 0 1.6-.3c.4-.3.5-.7.5-1.2 0-.4-.1-.8-.5-1A3 3 0 0 0 98 14h-2.9Zm3.5 8.3c.7 0 1.3-.1 1.7-.4.4-.2.6-.6.6-1.2 0-1-.8-1.5-2.3-1.5H95v3.1h3.5Zm15.7-.5h-5.8l-1.2 2.7h-3l5.7-12.6h2.9l5.6 12.6h-3l-1.2-2.7Zm-.9-2.2-2-4.9-2 4.9h4Zm8.4-5.4h-4V12h11v2.3h-4.1v10.3h-3V14.2Zm14.4 10.5c-1.3 0-2.5-.3-3.5-.8-1-.6-1.9-1.4-2.5-2.4-.6-1-.9-2-.9-3.3a6.4 6.4 0 0 1 3.4-5.7c1-.6 2.2-.9 3.5-.9 1.3 0 2.5.3 3.6.9a6.3 6.3 0 0 1 3.3 5.7 6.4 6.4 0 0 1-3.3 5.7c-1 .5-2.3.8-3.6.8Zm0-2.5a3.7 3.7 0 0 0 3.4-2c.4-.5.6-1.2.6-2s-.2-1.5-.5-2.1c-.4-.6-.9-1.1-1.5-1.4a4 4 0 0 0-2-.6 4 4 0 0 0-3.4 2c-.3.6-.5 1.3-.5 2 0 .9.2 1.6.5 2.2a3.8 3.8 0 0 0 3.4 2Zm17.1 2.3L151 21h-2.7v3.5h-2.9V11.9h5.5a7 7 0 0 1 2.9.5c.8.4 1.4 1 1.9 1.6.4.7.6 1.5.6 2.4 0 1-.2 1.8-.6 2.5-.5.7-1.1 1.2-2 1.5l2.9 4.1h-3.2Zm0-8c0-.8-.2-1.3-.7-1.7-.4-.4-1.1-.6-2-.6h-2.4v4.5h2.4c.9 0 1.6-.2 2-.6.5-.4.7-1 .7-1.7ZM0 11.9h3v12.6H0V11.9Zm8.5 2.4h-4v-2.4h11v2.4h-4v10.2h-3V14.3Zm25.2-2.4h3v12.6h-3V11.9Zm17.5 0v12.6h-2.4l-6.3-7.7v7.7h-2.9V11.9h2.5l6.2 7.6V12h3Z"
    />
    <path
      fill="#FF0808"
      fillRule="evenodd"
      d="M35 6.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M19.5 16a2 2 0 0 1 2 2c0 1-.9 2-2 2a2 2 0 0 1-2-2c0-1 .9-2 2-2Zm23 18.5a16.5 16.5 0 1 0 0-33 16.5 16.5 0 0 0 0 33Zm0 1.5a18 18 0 1 0 0-36 18 18 0 0 0 0 36Z"
      clipRule="evenodd"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const BrandSvg = memo(ForwardRef)
