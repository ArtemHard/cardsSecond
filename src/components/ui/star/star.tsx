import { StarSVG } from '../../../assets/icons/StarSvg'

import style from './star.module.scss'

type StarRatingProps = {
  rating: number
  setLengthRating: number
}

export const StarRating = (props: StarRatingProps) => {
  return (
    <div className={style.starContainer}>
      {Array.from({ length: props.setLengthRating }, (_, i) => (
        <StarSVG starId={i + 1} key={`star_${i + 1} `} marked={++i <= props.rating} />
      ))}
    </div>
  )
}
