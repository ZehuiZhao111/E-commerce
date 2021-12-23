import React from 'react'
import { Card, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import noimage from '../../images/noimage.png'
import ProductListItems from './ProductListItems'
import StarRating from 'react-star-ratings'
import RatingModal from '../modal/RatingModal'
import averageRating from '../../functions/rating'

const { TabPane } = Tabs

const SingleProduct = ({ product, onStarClick, rating }) => {
  const { title, images, description, _id } = product
  return (
    <>
      <div className='col-md-7'>
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((image) => (
                <img src={image.url} key={image.public_id} />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={<img src={noimage} className='mb-3 card-image' />}
          ></Card>
        )}

        <Tabs type='card'>
          <TabPane tab='Description' key='1'>
            {description && description}
          </TabPane>
          <TabPane tab='More' key='2'>
            Call us on 888 888 8888 to learn more about this product
          </TabPane>
        </Tabs>
      </div>

      <div className='col-md-5'>
        <h1 className='bg-primary p-3'>{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          averageRating(product)
        ) : (
          <div className='text-center pt-1 pb-3'>No rating yet</div>
        )}
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className='text-success' /> Add To Cart
            </>,
            <Link to='/'>
              <HeartOutlined className='text-info' /> <br /> Add To Wishlist
            </Link>,
            <RatingModal
              children={
                <StarRating
                  name={_id}
                  rating={rating}
                  numberOfStars={5}
                  changeRating={onStarClick}
                  isSelectable={true}
                  starRatedColor='red'
                />
              }
            />,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  )
}

export default SingleProduct
