import React, { useState, useEffect } from 'react'
import { getProduct, productStar } from '../functions/product'
import SingleProduct from '../components/cards/SingleProduct'
import { useSelector } from 'react-redux'
import { getRelated } from '../functions/product'
import ProductCard from '../components/cards/ProductCard'

const Product = ({ match }) => {
  const [product, setProduct] = useState({})
  const [rating, setRating] = useState(0)
  const [related, setRelated] = useState([])
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
    getProduct(slug).then((res) => {
      setProduct(res.data)
      getRelated(res.data._id).then((res) => setRelated(res.data))
    })
  }

  const onStarClick = (newRating, name) => {
    setRating(newRating)
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
      <div className='row pb-5'>
        {related.length ? (
          related.map((r) => (
            <div className='col-md-4' key={r._id}>
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className='text-center col'>No products found</div>
        )}
      </div>
    </div>
  )
}

export default Product
