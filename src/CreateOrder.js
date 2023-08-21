import React, { useState } from 'react';


function CreateOrder() {
  
  const [search, setSearch] = useState('');
  const [productss, setProductss] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

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

    

  const addProductToCart = (product) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  const handleProductSelect = (selectedProduct) => {
    addProductToCart(selectedProduct);
    setProductss([]);
  };


  return (<div>
           
           <div className="product-details mt-4">
              <div className="row mb-5">
                  <div className="col-md-3">
                     Search & Add Products
                  </div>  
                  <div className="col-md-9">
                     <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Product ID or Product Name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={handleSearchEnter}
                        />
                          {productss.length > 0 && (
                            <div className='searchProductContainer'>
                                {productss.map(product => (
                                    <div key={product.product_id} className="product-item" onClick={() => handleProductSelect(product)}>
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
              </div>
              <div className="cart-container row">
                 <div className="col-md-8 col-sm-12">
                              
                      {selectedProducts.length > 0 && (
                        <div>
                          <table className="cart-table">
                            <thead>
                              <tr>
                                <th>S.No</th>
                                <th>Product ID</th>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Product Qty</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedProducts.map((product, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{product.product_id}</td>
                                  <td>
                                    <img src={product.thumbnail_url} alt={product.title} />
                                  </td>
                                  <td>{product.title}</td>
                                  <td>{product.regular_price}$</td>
                                  <td>Qty Field go here</td>
                                  <td>
                                    <button className="btn btn-sm btn-danger" onClick={() => {/* Handle remove product logic */}}>Remove</button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
    
                 </div> 
              </div> 
           </div>

         </div>);
}

export default CreateOrder;
