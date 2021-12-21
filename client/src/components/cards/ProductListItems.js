import React from 'react';
import { Link } from 'react-router-dom';

const ProductListItems = ({ product }) => {
  const { price, category, subs, shipping, color, brand, quantity, sold } =
    product;
  return (
    <ul className='list-group'>
      <li className='list-group-item'>
        Price{' '}
        <span className='label label-default label-pill float-right'>
          $ {price}
        </span>
      </li>
      {category && (
        <li className='list-group-item'>
          Category{' '}
          <Link
            to={`/category/${category.slug}`}
            className='label label-default label-pill float-right'
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className='list-group-item'>
          Sub Categories
          {subs.map((sub, index) => (
            <Link
              key={sub._id}
              to={`/sub/${sub.slug}`}
              className='label label-default label-pill float-right'
              style={
                index === 0 ? { marginRight: '0px' } : { marginRight: '20px' }
              }
            >
              {sub.name}
            </Link>
          ))}
        </li>
      )}

      <li className='list-group-item'>
        Shipping{' '}
        <span className='label label-default label-pill float-right'>
          {shipping}
        </span>
      </li>

      <li className='list-group-item'>
        Color{' '}
        <span className='label label-default label-pill float-right'>
          {color}
        </span>
      </li>

      <li className='list-group-item'>
        Brand{' '}
        <span className='label label-default label-pill float-right'>
          {brand}
        </span>
      </li>
      <li className='list-group-item'>
        Available{' '}
        <span className='label label-default label-pill float-right'>
          {quantity}
        </span>
      </li>

      <li className='list-group-item'>
        Sold{' '}
        <span className='label label-default label-pill float-right'>
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
