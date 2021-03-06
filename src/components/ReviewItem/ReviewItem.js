import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const {name, quantity} = props.product;
    const reviewItemStyle={
        border: '1px solid lightgrey',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'

    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <h1 className="product-name">{name}</h1>
            <p>Quantity : {quantity}</p>
            <br/>
            <button className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;