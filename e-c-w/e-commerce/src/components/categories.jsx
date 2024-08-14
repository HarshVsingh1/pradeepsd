import { Box, Button, CircularProgress } from '@mui/material'
import './categories.css'
import CategorieCard from './subcomponents/categorieCard'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Categories({products}) {
  
     const navigate = useNavigate()
   
   
    return (
        <> 
              <div id='cardBlock' >
                     <div id="title" >
                            <div id="block" >
                                    
                            </div>
                            <div id='titleText' >
                                Today's
                            </div>
                     </div>
                     <div id="subTitleAndTime" >
                            <div id='subTitleAndTitleText' >
                                Flash Sales
                            </div>
                     </div> 
                     {products.length == 0  ? (
                        <div id='loaderBox' >
                        <Box  >
                      <CircularProgress />
                    </Box>
                  </div>
                     ) : (
                        <div id="cardDisplay" > 
                        {
                         products.map((product) => ( 
                             <div id='cardStyle' >
                             <CategorieCard 
                             key={product._id}
                             id={product._id}
                             productName={product.productName}
                             price={product.price}
                             image={product.imageUrl}
                             ></CategorieCard>
                             </div>
                         )) 
                        }
                       
                  </div>
                     )}
                   
                     <div id="viewAllProduct" >
                     <Button onClick={() => {navigate('/productview')}}  sx={{backgroundColor : "red" , ":hover"  : { backgroundColor : "#BF3131"}}} variant="contained">View All</Button>
                     </div>
              </div>

        </>
    )
}

export default Categories