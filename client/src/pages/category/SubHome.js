import React, { useState, useEffect } from 'react'
import { getSingleSub } from '../../functions/sub'
import ProductCard from '../../components/cards/ProductCard'

const SubHome = ({ match }) => {
  const [sub, setSub] = useState({})
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const slug = match.params.slug

  useEffect(() => {
    setLoading(true)
    getSingleSub(slug).then((res) => {
      setSub(res.data.sub)
      setProducts(res.data.products)
      setLoading(false)
    })
  }, [])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          {loading ? (
            <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
              Loading...
            </h4>
          ) : (
            <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
              {products.length} {products.length > 1 ? 'products' : 'product'}{' '}
              in "{sub.name}" sub category
            </h4>
          )}
        </div>
      </div>

      <div className='row'>
        {products.map((product) => (
          <div className='col-md-4' key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubHome
