import React, { useState, useEffect } from 'react'
import { getProductsByCount, fetchProductsByFilter } from '../functions/product'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const { search } = useSelector((state) => ({ ...state }))
  const { text } = search

  // useEffect(() => {
  //   loadAllProducts()
  // }, [])

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text })
    }, 300)
    return () => clearTimeout(delayed)
  }, [text])

  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(12).then((res) => {
      setProducts(res.data)
      setLoading(false)
    })
  }

  const fetchProducts = (arg) => {
    if (arg.query !== '') {
      setLoading(true)
      fetchProductsByFilter(arg).then((res) => {
        setProducts(res.data)
        setLoading(false)
      })
    } else {
      loadAllProducts()
    }
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>search filter menu</div>
        <div className='col-md-9'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : text === '' ? (
            <h4 className='text-danger'>We recommend these products for you</h4>
          ) : (
            <h4 className='text-danger'>
              {products.length} {products.length > 1 ? 'products' : 'product'}{' '}
              found related to "{text}"
            </h4>
          )}
          {products.length < 1 && <p>No products found</p>}
          <div className='row pb-5'>
            {products.map((product) => (
              <div key={product._id} className='col-md-4 mt-3'>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
