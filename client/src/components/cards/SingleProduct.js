import React, {useState, useEffect} from "react";
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import noimage from '../../images/noimage.png'
import ProductListItems from "./ProductListItems";

const {Meta} = Card

const SingleProduct = ({ product }) => {
  const { title, images} = product
  return (
    <>
    
      <div className="col-md-7">
        {images && images.length ?
          <Carousel showArrows={true} autoPlay infiniteLoop >
            {images && images.map(image => <img src={image.url} key={image.public_id}/>)}
          </Carousel> :
          <Card
          cover={
            <img
              src={noimage}
              className='mb-3 card-image'
            /> }
          ></Card>
        }
      </div>
      <div className="col-md-5">
        <h1 className="bg-primary p-3">{title}</h1>
        <Card
          actions={[
            <>
            <ShoppingCartOutlined className="text-success"/> Add To Cart
            </>,
            <Link to='/'><HeartOutlined className="text-info" /> <br/> Add To Wishlist</Link>
          ]}>
          
          <ProductListItems product={product}/>
        </Card>
      </div>
    </>
  )
}

export default SingleProduct