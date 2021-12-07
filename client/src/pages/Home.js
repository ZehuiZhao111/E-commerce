import React, {useEffect, useState} from 'react';
import ProductCard from '../components/cards/ProductCard';
import { getProductsByCount } from '../functions/product';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAllProducts
  }, [])

  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(3)
    .then(res => {
      setProducts(res.data)
      setLoading(false)
    })
  }

  return (
    <>
    <div className='jumbotron'>
      {loading ? (<h4>Loading...</h4>) : (<h4>Loading...</h4>)}
    </div>
    <div className='container'>
      <div className='row'>
        {
          products.masp((product) => <div key={product._id} className='col-md-4'><ProductCard product={product}/></div>)
        }
      </div>
    </div>
    </>
    
  );
};

export default Home;