import React, { useState, useEffect } from 'react'
import { getProductsByCount, fetchProductsByFilter } from '../functions/product'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'
import { Menu, Slider } from 'antd'
import { DollarOutlined } from '@ant-design/icons'

const { SubMenu, ItemGroup } = Menu

const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState([0, 0])
  const [ok, setOk] = useState(false)

  const dispatch = useDispatch()
  const { search } = useSelector((state) => ({ ...state }))
  const { text } = search

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text })
    }, 300)
    return () => clearTimeout(delayed)
  }, [text])

  useEffect(() => {
    fetchProducts({ price: price })
  }, [ok])

  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(12).then((res) => {
      setProducts(res.data)
      setLoading(false)
    })
  }

  const fetchProducts = (arg) => {
    console.log(arg)
    if (arg.query !== '' || arg.price) {
      console.log('get in')
      setLoading(true)
      fetchProductsByFilter(arg).then((res) => {
        console.log(res)
        setProducts(res.data)
        setLoading(false)
      })
    } else {
      loadAllProducts()
    }
  }

  const handleSlider = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setPrice(value)
    setTimeout(() => {
      setOk(!ok)
    }, 300)
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-2'>
          <h4>Search / Filters</h4>
          <hr />
          <Menu defaultOpenKeys={['1', '2']} mode='inline'>
            <SubMenu
              key='1'
              title={
                <span className='h6'>
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className='ml-4 mr-4'
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max={'100000'}
                />
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className='col-md-9 pt-2'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : text === '' && price[1] === 0 ? (
            <h4 className='text-danger'>We recommend these products for you</h4>
          ) : (
            <h4 className='text-danger'>
              {products.length} {products.length > 1 ? 'products' : 'product'}{' '}
              found
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
