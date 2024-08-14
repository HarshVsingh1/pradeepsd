import { Alert, Box, Button, Rating, Snackbar } from '@mui/material'
import './categorieCard.css'
import StarIcon from '@mui/icons-material/Star';
import './productCard.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function ProductCard({productName,Price,Image,description , id}) {
  
  const navigate = useNavigate()
  const email = sessionStorage.getItem('email')
  const token = sessionStorage.getItem('token')
  const [servity,setServity] = useState('success')
  const [message,setMessage] = useState('')
  const [open,setOpen] = useState(false)

  const ratingValue = 3.5 ;
  
  const handleClose = () => {
    setOpen(false)
  }

 

  
   
  
  
  const openbox = (message , servity ) => {
    setMessage(message)
        setServity(servity)
        setOpen(true)
    
    
     
  }
 
  const addtocart = async(productId) => { 

    try {
      const response = await fetch('http://localhost:3000/user/addtocart' , {
        method :'POST' ,
        headers : {
          'Content-Type' : 'application/json' ,
          authorization : token
        } ,
        body : JSON.stringify({
         email ,
         productId
        })
      }) 
      if(response.ok){
        const data = await response.json()
        openbox(data.message)
      }else{
            console.error('Error :' , error.message )
      }
    }catch(error) { 
      console.error('Error :', error.message);
        openbox("signup before adding product to cart" , "error")
    }
       

  }

   return (
     <>
           <div id="productcardDimension" > 
           <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={servity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar> 
           <div>

          
                 <div id='imageBox' >
                        <img  onClick={ () => { navigate('/product/' + id )}} style={{height : "250px" , width : "100%" , objectFit : "cover" , borderTopLeftRadius : "20px" , borderTopRightRadius : "20px" }} src={`data:image/png;base64,${Image}`}  ></img>   
                 </div>
                 
             </div>  

             <div id='productDescription' >
                         
                        <div id='productName' >
                               {productName}
                            </div>
                            
                            <div id='descriptionText' > 
                              {description}
                            </div>
                            <div id='priceBox' >
                            ₹{Price}
                            </div>
                            <div>
                            <Box sx={{
                                  width: 200,
                                  display: 'flex',
                                  alignItems: 'center',
                                  margin : "10px"
                                }}
                              >
                                <Rating
                                  name="text-feedback"
                                  value={ratingValue}
                                  readOnly
                                  precision={0.5}
                                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                             </Box>
           
                            </div>

                            <div id='buttonSection' >
                                   <div  >
                                   <Button  onClick={() => {addtocart(id)}} sx={{backgroundColor : "red" , ":hover"  : { backgroundColor : "#BF3131"}}} variant="contained">Add to cart</Button>
                                   </div>
                                   <div>
                                   <Button sx={{backgroundColor : "red" , ":hover"  : { backgroundColor : "#BF3131"}}} variant="contained">Buy Now</Button>
                                    </div>
                            </div>
                        
            </div>

        </div>
           
    </>
   )
}

export default ProductCard