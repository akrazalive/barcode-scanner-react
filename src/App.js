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

    const handleEnter = async (e) => {
        if (e.key === 'Enter') {
            try {
                const response = await fetch(`https://rapidfiller.com/wp-json/barcode/v1/get-product/?barcode=${barcode}`);
                const data = await response.json();

                if (response.ok) {
                    setProduct(data);
                } else {
                    console.error('API error:', data.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
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
                    <h2>{product.title}</h2>
                    <p>Regular Price: {product.regular_price}</p>
                    <p>Sale Price: {product.sale_price}</p>
                    <p>Stock Status: {product.stock_status}</p>
                    <p>Stock Quantity: {product.stock_quantity}</p>
                    <img src={product.thumbnail_url} alt={product.title} />
                </div>
            )}
        </div>
    );
}

export default App;
