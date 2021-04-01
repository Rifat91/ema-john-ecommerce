import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    //console.log(cart);
    //const total = cart.reduce((total, product) => total + product.price , 0);  //using reduce. Its harder <<<<<<<=
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity || 1;
        debugger;
    }

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }

    const formateNumber = num => {
        const precisions = num.toFixed(2);
        return Number(precisions);
    }

    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2)
    return (
        <div>
            <h4>Order Summery</h4>
            <p>Items Orderer : {cart.length}</p>
            <p>Product Price : {formateNumber(total)}</p>
            <p><small>Shipping Cost : {shipping}</small></p>
            <p>vat + tax : {tax}</p>
            <p>Total Price : {grandTotal}</p>
            <br />
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;