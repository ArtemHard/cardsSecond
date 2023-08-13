import { SVGProps, Ref, forwardRef, memo } from 'react'

export type StarProps = {
  starId: number
  marked: boolean
}

const FilledStar = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement> & StarProps>(
    ({ starId, ...props }, ref: Ref<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={17}
        fill="none"
        ref={ref}
        {...props}
        {...{
          ['star-id']: { starId },
        }}
      >
        <g clipPath="url(#a)">
          <path
            fill="#E6AC39"
            d="M11.7 14.5h-.3l-3.4-2-3.4 1.8a.7.7 0 0 1-1-.7l.7-3.7-2.7-2.7a.7.7 0 0 1-.2-.7.7.7 0 0 1 .5-.4l3.8-.6 1.7-3.4a.7.7 0 0 1 1.2 0l1.7 3.4 3.8.6a.7.7 0 0 1 .5.4.7.7 0 0 1-.1.7L11.7 10l.7 3.7a.7.7 0 0 1-.3.7l-.4.1Z"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 .5h16v16H0z" />
          </clipPath>
        </defs>
      </svg>
    )
  )
)

const OutlinedStar = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement> & StarProps>(
    ({ starId, ...props }, ref: Ref<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={17}
        fill="none"
        ref={ref}
        {...props}
        {...{
          ['star-id']: { starId },
        }}
      >
        <g clipPath="url(#a)">
          <path
            fill={props.fill ?? '#E6AC39'}
            d="M11.7 14.5h-.3l-3.4-2-3.4 1.8a.7.7 0 0 1-1-.7l.7-3.7-2.7-2.7a.7.7 0 0 1-.2-.7.7.7 0 0 1 .5-.4l3.8-.6 1.7-3.4a.7.7 0 0 1 1.2 0l1.7 3.4 3.8.6a.7.7 0 0 1 .5.4.7.7 0 0 1-.1.7L11.7 10l.7 3.7a.7.7 0 0 1-.3.7l-.4.1ZM8 11.2l.3.1 2.5 1.3-.5-2.8a.7.7 0 0 1 .2-.6l2-2L9.7 7a.7.7 0 0 1-.4-.4L8 4 6.7 6.5a.7.7 0 0 1-.5.4l-2.8.4 2 2a.7.7 0 0 1 .2.5l-.4 2.8 2.5-1.3H8Z"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 .5h16v16H0z" />
          </clipPath>
        </defs>
      </svg>
    )
  )
)

export const StarSVG = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement> & StarProps>(
  ({ fill, marked, starId }, ref) => {
    console.log(marked ? 1 : 2)

    return (
      <>
        {marked ? (
          <FilledStar fill={fill} starId={starId} marked={marked} ref={ref} />
        ) : (
          <OutlinedStar fill={fill} starId={starId} marked={marked} ref={ref} />
        )}
      </>
    )
  }
)
