import React, { useState, useEffect } from 'react';
import Footer from './components/footer';
import Navbar from './components/navbar';
import ProductCard from './components/subcomponents/productCard';
import './productpage.css'
import { useParams } from 'react-router-dom';
import {  Box, CircularProgress } from '@mui/material';


const Categoryproductpages = () => {
 
    const {category} = useParams()
    const [products, setProducts] = useState([])

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products/category/' + category);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
        
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

        <div>     
          <div id='filterPannel' >

          </div> 
          {products.length == 0 ? (
             <div id='loaderBox' >
             <Box  >
           <CircularProgress />
         </Box>
       </div>
          ): (
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
          )}
               
         </div>

        <div>
            <Footer></Footer>
        </div>
    </div>
  );
};

export default Categoryproductpages;
