import React, { useState, useEffect } from 'react'
import { getProductsByCount, fetchProductsByFilter } from '../functions/product'
import { getCategories } from '../functions/category'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'
import { Menu, Slider, Checkbox } from 'antd'
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from '@ant-design/icons'
import Star from '../components/forms/Star'

const { SubMenu, ItemGroup } = Menu

const Shop = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState([0, 0])
  const [ok, setOk] = useState(false)
  const [categories, setCategories] = useState([])
  const [categoryIds, setCategoryIds] = useState([])
  const [star, setStar] = useState('')

  const dispatch = useDispatch()
  const { search } = useSelector((state) => ({ ...state }))
  const { text } = search

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text })
    }, 300)
    setPrice([0, 0])
    setCategoryIds([])
    setStar('')
    return () => clearTimeout(delayed)
  }, [text])

  useEffect(() => {
    fetchProducts({ price: price })
  }, [ok])

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data))
  }, [])

  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(12).then((res) => {
      setProducts(res.data)
      setLoading(false)
    })
  }

  const fetchProducts = (arg) => {
    if (star != '' && arg.query === '') {
      return
    }
    if (categoryIds.length > 0 && arg.query === '') {
      return
    }
    if (!(price[0] === 0 && price[1] === 0) && arg.query === '') {
      return
    }

    if (
      (arg.query && arg.query !== '') ||
      (arg.price && !(arg.price[0] === 0 && arg.price[1] === 0)) ||
      (arg.category && arg.category.length > 0) ||
      (arg.stars && arg.stars !== '')
    ) {
      setLoading(true)
      fetchProductsByFilter(arg).then((res) => {
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
    setCategoryIds([])
    setPrice(value)
    setStar('')
    setTimeout(() => {
      setOk(!ok)
    }, 300)
  }

  const showCategories = () => {
    console.log(categoryIds)
    return categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className='pb-2 pl-4 pr-4'
          value={c._id}
          checked={categoryIds.includes(c._id)}
          name='category'
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ))
  }

  const handleCheck = (e) => {
    console.log(e.target.value)
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setPrice([0, 0])
    setStar('')
    const inTheState = [...categoryIds]
    const justChecked = e.target.value
    const foundInTheState = inTheState.indexOf(justChecked)
    if (foundInTheState === -1) {
      inTheState.push(justChecked)
    } else {
      inTheState.splice(foundInTheState, 1)
    }
    setCategoryIds(inTheState)
    fetchProducts({ category: inTheState })
  }

  const handleStarClick = (num) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setStar(num)
    setPrice([0, 0])
    setCategoryIds([])
    fetchProducts({ stars: num })
  }
  const showStars = () => (
    <div className='pr-4 pl-4 pb-2'>
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  )

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-2'>
          <h4>Search / Filters</h4>
          <hr />
          <Menu defaultOpenKeys={['1', '2', '3']} mode='inline'>
            {/* price */}
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

            {/* category */}
            <SubMenu
              key='2'
              title={
                <span className='h6'>
                  <DownSquareOutlined /> Catrgories
                </span>
              }
            >
              <div style={{ marginTop: '-10px' }}>{showCategories()}</div>
            </SubMenu>

            {/* stars */}
            <SubMenu
              key='3'
              title={
                <span className='h6'>
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div style={{ marginTop: '-10px' }}>{showStars()}</div>
            </SubMenu>
          </Menu>
        </div>
        <div className='col-md-9 pt-2'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4 className='text-danger'>
              {products.length} {products.length > 1 ? 'products' : 'product'}{' '}
              found
            </h4>
          )}
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
