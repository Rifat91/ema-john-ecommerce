import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    //console.log(props)
    const { img, name, seller, price, stock, key } = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />

            </div>

            <div>
                <h3 className='product-name'> <Link to={"/product/"+key}>{name}</Link> </h3><br />
                <p><small>BY: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in the stock - Order Soon</small></p>
                { props.showAddToCart === true && <button
                    className='main-button'
                    onClick={() => props.handelAddProduct(props.product)}
                ><FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>}
            </div>
        </div>
    );
};

export default Product;