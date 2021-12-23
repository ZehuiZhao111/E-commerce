import React, { useState, useEffect } from 'react'
import { getProduct, productStar } from '../functions/product'
import SingleProduct from '../components/cards/SingleProduct'
import { useSelector } from 'react-redux'

const Product = ({ match }) => {
  const [product, setProduct] = useState({})
  const [rating, setRating] = useState(0)
  // redux
  const { user } = useSelector((state) => ({ ...state }))

  const { slug } = match.params

  useEffect(() => {
    loadingSingleProduct()
  }, [slug])

  useEffect(() => {
    console.log(product)
    if (product.ratings && user) {
      let existingRatingObj = product.ratings.find(
        (rating) => rating.postedBy.toString() === user._id.toString()
      )
      if (existingRatingObj !== undefined) {
        setRating(existingRatingObj.star)
      }
    }
  }, [product, user])

  const loadingSingleProduct = () => {
    getProduct(slug).then((res) => setProduct(res.data))
  }

  const onStarClick = (newRating, name) => {
    setRating(newRating)
    // api call here
    productStar(name, newRating, user.token).then((res) => {
      loadingSingleProduct()
    })
  }

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          rating={rating}
        />
      </div>
      <div className='row'>
        <div className='col text-center pt-5 pb-5'>
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
    </div>
  )
}

export default Product
