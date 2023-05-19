import React, { useState } from 'react';
import fakedata from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/ Product';
import './Shop.css';
const Shop = () => {
  const firstTen = fakedata.slice(0,10);
  const [products]= useState(firstTen);
  const [cartCount ,setCart] = useState([]);
  const cartHandel = (product) => {
       let newCount = [...cartCount, product];
       console.log(newCount)
       setCart(newCount);
  }
 
    return (
       
        <div className='shop'>
            <div className="shop-content">
           {
            products.map(product =>  <Product
             product={product}
            cartHandel={cartHandel}
            ></Product>)
           }
           
            </div>
            <div className="cart-content">
                <div className="cart">
              <Cart cartCount={cartCount}></Cart>
             
                </div>
            </div>
        </div>
    );
};

export default Shop;