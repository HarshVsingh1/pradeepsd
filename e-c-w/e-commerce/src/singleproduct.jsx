
import { useEffect, useState } from "react"
import Footer from "./components/footer"
import Navbar from "./components/navbar"
import { useParams } from "react-router-dom"
import { Alert, Box, Button, Rating, Snackbar } from "@mui/material"
import StarIcon from '@mui/icons-material/Star';
import './singleproduct.css'

function Singleproductview() {

   const {productId} = useParams()
   const token = sessionStorage.getItem('token')
   const email = sessionStorage.getItem('email')
   const [product,setProduct] = useState([])
   const [message,setMessage] = useState('')
   const [servity,setServity] = useState('success')
   const [open,setOpen] = useState(false) ;

   const fetchProduct = async () => {
     
    try {
         const response =  await fetch('http://localhost:3000/api/products/'+ productId , {
          method : "GET" ,
          headers : {
            "Content-Type" : "application/json" 
          },
          
         })

        if(response.ok) {
          const data =  await response.json()
          setProduct(data)
        } 
    }
    catch {

    }
      
   }   
   
   const handleClose = () => {
    setOpen(false)
  }

 

  
   
  
  
  const openbox = (message , servity ) => {
    setMessage(message)
        setServity(servity)
        setOpen(true)
    
    
     
  }



   useEffect(() => {
            fetchProduct()
   },[])
   

  const addtocart = async() => { 

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
        openbox('product added to cart successfuly' , "success")
      }
    }catch(error) { 
      console.error('Error :', error.message);
             console.log('error while adding product to cart')
    }
       

  }
  


  return (
    <>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={servity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar> 
    <div>
        <Navbar></Navbar>
        <div>
            <div id="productGrid" >
               
               <div id='imageSection' >
                              <img style={{  height : "100%" , width : "100%" ,objectFit : "cover" , borderRadius : "20px"}}  src={`data:image/png;base64,${product.imageUrl}`} ></img>
                       </div> 
               
                       <div id="productInfoSection" >
                       <div id="Text" >
                               {product.productName}
                            </div>
                            
                            <div id='descriptiontext' > 
                              {product.description}
                            </div>
                            <div id='productPriceBox' >
                            ₹{product.price}
                            </div>
                            <div>
                            <Box sx={{
                                  width: 200,
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <Rating
                                  name="text-feedback"
                                  value={3}
                                  readOnly
                                  precision={0.5}
                                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                             </Box>
           
                            </div>

                            <div id='productButtonSection' >
                                   <div  >
                                   <Button onClick={() => {addtocart()}} sx={{backgroundColor : "red" , ":hover"  : { backgroundColor : "#BF3131"}}} variant="contained">Add to cart</Button>
                                   </div>
                                   <div>
                                   <Button sx={{backgroundColor : "red" , ":hover"  : { backgroundColor : "#BF3131"}}} variant="contained">Buy Now</Button>
                                    </div>
                            </div>
                       </div>

            </div>
        </div>
        <div>
          <Footer></Footer>
        </div>
    </div>
    </>
  )
}

export default Singleproductview 