import { Box, Button, Rating } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import './cartcards.css'
import { useNavigate } from "react-router-dom";


function Cartcard({image , productName , price ,id , reset}) {
    const navigate = useNavigate() 
    const email = sessionStorage.getItem('email')
    const token = sessionStorage.getItem('token')


    const removeFromCart = async () => {
        const response = await fetch('http://localhost:3000/user/removefromcart' , {
            method : "POST" ,
            headers : {
                'Content-Type' : 'application/json' ,
                authorization  : token
            } ,
            body : JSON.stringify({
                email ,
                productId : id
            })
        }) 
        if(response.ok){
            console.log("removed product successfully")
            reset()
        }
    } 
    return (
        <>
        <div>
        <div id="cartCardDimension" >
                           
                           <div id='imageBox' >
                                  <img  onClick={ () => { navigate('/product/' + id )}} style={{height : "250px" , width : "100%" , objectFit : "cover" , borderRadius : "20px" }} src={`data:image/png;base64,${image}`}  ></img>   
                                  
          
                           </div>
                           <div id='productName' >
                              {productName}
                              
                           </div>
                           <div id='priceBox' >
                           ₹{price}
                           </div>
                           <div style={{margin : " 0 8px"}}  >
                           <Box sx={{
                                 width: 200,
                                 display: 'flex',
                                 alignItems: 'center',
                               }}
                             >
                               <Rating
                                 name="text-feedback"
                                 value={4.5}
                                 readOnly
                                 precision={0.5}
                                 emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                               />
                             </Box>
                                
                           
                           </div>
                        
                           <div id='buttonSection' >
                                   <div  >
                                   <Button onClick={() => {removeFromCart()}} sx={{backgroundColor : "red" , ":hover"  : { backgroundColor : "#BF3131" } }} variant="contained">Remove from cart</Button>
                                   </div>
                            </div>
                          
                     </div>
        </div>
        </>
    )
}

export default Cartcard ;