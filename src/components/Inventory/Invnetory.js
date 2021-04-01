import React from 'react';

const Invnetory = () => {
    const product = {}
    const handleAddProduct = () => {
        fetch('http://localhost:5000/addProduct', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
    }
    return (
        <div>
            <form action="">
            <p><span>Name: </span><input type="text"></input></p>
            <p><span>Price: </span><input type="text"></input></p>
            <p><span>Quantity:</span><input type="text"></input></p>
            <p><span>Product Image: </span><input type="file"></input></p>

            <button onClick={handleAddProduct}>Add Product</button>
            </form>
            
        </div>
    );
};

export default Invnetory;