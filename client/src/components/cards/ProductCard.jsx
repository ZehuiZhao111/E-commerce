import React from 'react'
import { Card } from 'antd'
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import noimage from '../../images/noimage.png'
import { Link } from 'react-router-dom';
const {Meta} = Card

const ProductCard = ({product}) => {
  const { images, title, description, slug } = product
  return(
    <Card
    hoverable
    cover={
      <img
        src={images && images.length ? images[0].url : noimage}
        style={{ height: 150, objectFit: 'cover' }}
        className='p-1'
      />
    }
    actions={[
      <Link to={`/product/${slug}`}>
        <EyeOutlined className='text-warning' /> <br /> View Product
      </Link>,
      <>
        <ShoppingCartOutlined
          className='text-danger'
        /> <br /> Add to Cart
      </>
    ]}
  >
    <Meta
      title={title}
      description={`${description && description.substring(0, 40)}...`}
    />
  </Card>
  )
  
}

export default ProductCard