import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateOrder from './CreateOrder';

// Dummy product data
const dummyProduct = {
    name: 'Dummy Product',
    price: '$129.99',
    description: 'It is very good product',
    image: 'https://pakistani.pk/uploads/reviews/photos/original/4b/1e/20//Hande20ErC3A7el203-30-1507621486.jpg',
};


function App() {
    const [barcode, setBarcode] = useState('');
    const [search, setSearch] = useState('');
    const [product, setProduct] = useState(null);
    const [productss, setProductss] = useState([]);
    const [orderComponent, setOrderComponent] = useState(false);

    const handleEnter = async (e) => {
        if (e.key === 'Enter') {
            try {
                const response = await fetch(`https://rapidfiller.com/wp-json/barcode/v1/get-product/?barcode=${barcode}`);
                const data = await response.json();
                console.log(data);   
                if (response.ok) {
                    setProduct(data);
                    setOrderComponent(false);
                } else {
                    console.error('API error:', data.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

   

    const handleSearchEnter = async (e) => {
       // if (e.key === 'Enter') {
            try {
                const response = await fetch(`https://rapidfiller.com/wp-json/searchquery/v1/get-product/?search=${search}`);
                const data = await response.json();
                setProductss(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
       // }
    };

    const handleProductClick = (product) => {
        console.log(product);
        setProduct(product);
        setProductss([]);
        setOrderComponent(false);

    };


    const loadOrderComponent = () => {
      setOrderComponent(true);
      setProduct(null);
    }; 

    return (
    <div className="App">
        <div className="barcode-container">
            <div className="mb-3 row">
                <div className="col-md-2 col-sm-12">
                            <label htmlFor="regularPrice" className="form-label"><strong>Scan Product Barcode</strong></label>
                </div>
                <div className="col-md-2 col-sm-12"> 
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter barcode"
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                            onKeyPress={handleEnter}
                        />
                </div>
                
                <div className="col-md-2 col-sm-12">
                            <label htmlFor="regularPrice" className="form-label"><strong>Search Products</strong></label>
                </div>
                <div className="col-md-4 col-sm-12"> 
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Product ID | Name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={handleSearchEnter}
                        />
                          {productss.length > 0 && (
                            <div className='searchProductContainer'>
                                {productss.map(product => (
                                    <div key={product.product_id} className="product-item" onClick={() => handleProductClick(product)}>
                                        <div className="product-content">
                                            <img src={product.product_image} alt={product.product_name} className="product-image" />
                                            <div className="product-info">
                                                <p>{product.title}  ID: {product.product_id}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                          )}
                </div>
                <div className="col-md-2">
                   <input className="form-control btn btn-sm btn-success" onClick={()=>loadOrderComponent()} value="Generate New Order" />
                </div>
            </div>      

        </div>
        {orderComponent && <CreateOrder />}
        {product && (
            <div className="product-details mt-4 row">
                <div className="col-md-4">
                    <img src={product.thumbnail_url} alt={product.title} className="img-fluid" />
                </div>
                <div className="col-md-8">
                    <h3>{product.title}</h3>
                    <div className="mt-5 mb-3 row">
                        <div className="col-md-3 bar_labelss">
                           <label htmlFor="regularPrice" className="form-label"><strong>Regular Price:</strong></label>
                        </div>

                        <div className="col-md-3 bar_inputs">
                            <input
                                type="text"
                                className="form-control"
                                id="regularPrice"
                                value={product.regular_price}
                                readOnly
                            />
                        </div>
                        <div className="col-md-3 bar_labelss">
                        <label htmlFor="salePrice" className="form-label"><strong>Sale Price:</strong></label>
                      </div>
                      <div className="col-md-3 bar_inputs">
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
                       <div className="col-md-3 bar_labelss">
                         <label htmlFor="stockStatus" className="form-label"><strong>Stock Status:</strong></label>
                       </div>

                       <div className="col-md-3 bar_select">
                        <select
                            className="form-select"
                            id="stockStatus"
                            value={product.stock_status}
                            disabled
                        >
                            <option>{product.stock_status}</option>
                        </select>
                       </div>
                       <div className="col-md-3 bar_labelss">
                        <label htmlFor="stockQuantity" className="form-label"><strong>Stock Quantity:</strong></label>
                       </div>

                       <div className="col-md-3 bar_inputs"> 
                        <input
                            type="text"
                            className="form-control"
                            id="stockQuantity"
                            value={product.stock_quantity}
                            readOnly
                        />
                       </div>  
                    </div>
                    <div className="mb-3 row">
                       <div className="col-md-3 bar_labelss">
                         <label htmlFor="productType" className="form-label"><strong>Product Type:</strong></label>
                       </div>

                       <div className="col-md-3 bar_select">
                        <select
                            className="form-select"
                            id="productType"
                            value="0"
                            disabled
                        >
                            <option>{product.product_type}</option>
                        </select>
                       </div>
                        
                    </div>
                    <div className="row">
                       <div className="col-md-12 bar_labelss">
                        <label htmlFor="productCategory" className="form-label"><strong>Product Categories:</strong></label>
                       </div>
                    </div>
                    <div className="row">                     
                    {product.product_categories.map(category => (
                        <div key={category} className="col-md-4 bar_labelss">
                            <label className="checkbox-label form-check-label">
                                <input
                                    type="checkbox"
                                    name="productCategory"
                                    value={category}
                                    defaultChecked
                                    disabled
                                    className="checkbox-input form-check-input"
                                />
                                <span className="checkbox-text">{category}</span>
                            </label>
                        </div>
                    ))}
                    </div>

                     <div className="row">
                       <div className="col-md-12 bar_labelss">
                        <label htmlFor="productCategory" className="form-label"><strong>Short Description:</strong></label>
                       </div>
                    </div>
                    <div className="row">                     
                    <textarea
                        id="shortDescription"
                        className="form-control"
                        value={product.short_description}
                        disabled
                    />
                    </div>      
                   
                </div>
            </div>
        )}
    </div>
);

}

export default App;
