import React, { useState, useEffect } from 'react';
import Footer from './components/footer';
import Navbar from './components/navbar';
import ProductCard from './components/subcomponents/productCard';
import './productpage.css'
import {  Box  } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


const Productpages = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); 
  
 


  return (
    <div> 
          
        <div>
        <Navbar></Navbar>
        </div>

        {products.length == 0 ? ( 
          <div id='loaderBox' >
                <Box  >
              <CircularProgress />
            </Box>
          </div>
             
        ) : (
          <div>     
          <div id='filterPannel' >

          </div>
                <div  id='productDisplay' >
                       {products.map((product) => (
                         
                         <ProductCard
                       key={product._id}
                       id={product._id}
                       productName={product.productName}
                       description={product.description}
                       Price={product.price}
                       Image={product.imageUrl}
                       />
                       
                       ))}
                 
                 </div>
         </div>
        )}



        <div>
            <Footer></Footer>
        </div>
    </div>
  );
};

export default Productpages;
