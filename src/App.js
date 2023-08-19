import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <div className="mb-3 row">
            <div className="col-md-2">
                           <label htmlFor="regularPrice" className="form-label"><strong>Scan Product Barcode</strong></label>
             </div>
              <div className="col-md-4"> 
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter barcode"
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                        onKeyPress={handleEnter}
                    />
             </div>
            </div>      

        </div>
        {product && (
            <div className="product-details mt-4 row">
                <div className="col-md-6">
                    <img src={product.thumbnail_url} alt={product.title} className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <h2>{product.title}</h2>
                    <div className="mb-3 row">
                        <div className="col-md-8 bar_labels">
                           <label htmlFor="regularPrice" className="form-label"><strong>Regular Price:</strong></label>
                        </div>

                        <div className="col-md-4 bar_inputs">
                            <input
                                type="text"
                                className="form-control"
                                id="regularPrice"
                                value={product.regular_price}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="mb-3 row">
                      <div className="col-md-8 bar_labels">
                        <label htmlFor="salePrice" className="form-label"><strong>Sale Price:</strong></label>
                      </div>
                      <div className="col-md-4 bar_inputs">
                        <input
                            type="text"
                            className="form-control"
                            id="salePrice"
                            value={product.sale_price}
                            readOnly
                        />
                       </div> 
                    </div>
                    <div className="mb-3 row">
                       <div className="col-md-8 bar_labels">
                         <label htmlFor="stockStatus" className="form-label"><strong>Stock Status:</strong></label>
                       </div>

                       <div className="col-md-4 bar_select">
                        <select
                            className="form-select"
                            id="stockStatus"
                            value={product.stock_status}
                            disabled
                        >
                            <option>{product.stock_status}</option>
                        </select>
                      </div>  
                    </div>
                    <div className="mb-3 row">
                        
                       <div className="col-md-8 bar_labels">
                        <label htmlFor="stockQuantity" className="form-label"><strong>Stock Quantity:</strong></label>
                       </div>

                       <div className="col-md-4 bar_inputs"> 
                        <input
                            type="text"
                            className="form-control"
                            id="stockQuantity"
                            value={product.stock_quantity}
                            readOnly
                        />
                       </div>  
                    </div>
                </div>
            </div>
        )}
    </div>
);

}

export default App;
