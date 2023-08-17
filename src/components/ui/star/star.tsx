import { StarSVG } from '../../../assets/icons/StarSvg'

type StarRatingProps = {
  rating: number
  setLengthRating: number
}

export const StarRating = (props: StarRatingProps) => {
  return (
    <div>
      {Array.from({ length: props.setLengthRating }, (_, i) => (
        <StarSVG starId={i + 1} key={`star_${i + 1} `} marked={++i <= props.rating} />
      ))}
    </div>
  )
}
