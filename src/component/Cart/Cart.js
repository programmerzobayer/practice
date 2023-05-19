
import React,{useState} from 'react';
import { Link} from "react-router-dom";

const Cart = (props) => {
const cart = props.cartCount ;
let  price =0 ;
parseFloat(price);
for(let i =0 ; i<cart.length; i++){
     let product = cart[i]  ;
  price= price + product.price ;
}
 let shipping =0
 parseFloat(shipping)
if(price >30){
  shipping = 0 ;
}
else if (price > 15 ){
  shipping =4.99;
}else if (price > 0){
  shipping = 4.99 ;
}
    return (
        <div>
        <h3>Order summary</h3>
        <h4>Total Order {cart.length}</h4>
        <h2>Price {price.toFixed(2)}</h2>
         <h3>Shipping ${shipping.toFixed(2)}</h3>
         <h3>Total Price ${price + shipping}</h3>
        <Link to="chackout"> <button>proceed checkout</button></Link>

        </div>
    );
};

export default Cart;