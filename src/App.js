import React, { useState } from 'react';
import './App.css';

// Dummy product data
const dummyProduct = {
    name: 'Dummy Product',
    price: '$129.99',
    description: 'It is very good product',
    image: 'https://pakistani.pk/uploads/reviews/photos/original/4b/1e/20//Hande20ErC3A7el203-30-1507621486.jpg',
};

function App() {
    const [barcode, setBarcode] = useState('');
    const [product, setProduct] = useState(null);

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setProduct(dummyProduct);
        }
    };

    return (
        <div className="App">
            <div className="barcode-container">
                <input
                    type="text"
                    placeholder="Enter barcode"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    onKeyPress={handleEnter}
                />
            </div>
            {product && (
                <div className="product-details">
                    <h2>{product.name}</h2>
                    <p>Price: {product.price}</p>
                    <div className="desc">{product.description}</div>
                    <img src={product.image} alt={product.name} />
                </div>
            )}
        </div>
    );
}

export default App;
