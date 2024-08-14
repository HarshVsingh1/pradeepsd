import { Box, Rating } from '@mui/material'
import './categorieCard.css'
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

function CategorieCard({image , productName , price ,id}) {
 
   const navigate = useNavigate()


   return (
     <>
           <div id="cardDimension" >
                           
                 <div id='imageBox' >
                        <img  onClick={ () => { navigate('/product/' + id )}} style={{height : "250px" , width : "100%" , objectFit : "cover" , borderRadius : "20px" }} src={`data:image/png;base64,${image}`}  ></img>   
                        

                 </div>
                 <div id='productName' >
                    {productName}
                    
                 </div>
                 <div id='priceBox' >
                 ₹{price}
                 </div>
                 <div  >
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
           </div>
           
    </>
   )
}

export default CategorieCard