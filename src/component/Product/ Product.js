import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';

const  Product = (props) => {
    const {name , price , img,seller,stock,} = props.product ;
    return (
        <div className='product'>
          <div className="product-image">
            <img src={img} alt="" />
          </div>
          <div className="product-details">
            <h5>{name}</h5>
            <br />
            <p><small>by: {seller}</small></p>
            <h2>${price}</h2>
            <p><small>Only {stock} stock left in Order-soon</small></p>
            <button onClick={() => props.cartHandel(props.product)}>
            Add to cart {}
            <FontAwesomeIcon icon={faCartShopping} /> 
            </button>
          </div>
        </div>
    );
};

export default  Product;