import React from 'react'
import StarRatings from 'react-star-ratings'

const averageRating = (product) => {
  let result
  if (product && product.ratings) {
    const ratingsArr = product.ratings
    const total = []
    const length = ratingsArr.length
    ratingsArr.map((r) => total.push(r.star))
    const totalReduced = total.reduce((preVal, newVal) => preVal + newVal, 0)
    const height = length * 5
    result = (totalReduced * 5) / height
  }
  return (
    <div className='text-center pt-1 pb-3'>
      <span>
        <StarRatings
          starDimension='20px'
          starSpacing='2px'
          starRatedColor='red'
          rating={result}
          editing={false}
        />
        ({product.ratings.length})
      </span>
    </div>
  )
}

export default averageRating
