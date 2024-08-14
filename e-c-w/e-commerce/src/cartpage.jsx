import { useEffect, useState } from "react";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import './cartpage.css'
import Cartcard from './components/subcomponents/cartcards'
import { Alert, Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Cartpage() {
    const token = sessionStorage.getItem('token')
    const email = sessionStorage.getItem('email')
    const [subtotal,setSubtotal] = useState(0)
    const [cartproduct , setCartproduct] = useState([])
    const [productlist,setProductlist] = useState([])
    const navigate = useNavigate()
    const user = async () => { 
    
    
    

        try {
            const response = await fetch('http://localhost:3000/user/cart' , {
                method : "POST" ,
                headers : {
                    'Content-Type' : 'application/json' ,
                    authorization : token
                } ,
                body : JSON.stringify({
                    email : email
                })
             })

             if(response.ok) {
                const data = await response.json()
                let total = 0; 
                let productarray = []
                data.cartproducts.forEach(product => {
                    total += product.price;  
                    productarray.push(product._id)
                });
                setSubtotal(total);
                setProductlist(productarray)
                console.log(productarray)
                setCartproduct(data.cartproducts) 

             } else {
                 console.log('hello')
             }
        }catch(error) {
            console.error('Error :', error.message);
        } 
        
    } 

    useEffect(() => {
        user()
    },[]) 

    const gateway = () => {
        window.location.href = 'http://localhost:5174/gateway/?subtotal=' + subtotal;
    }
    

    const placeorder = async () => { 
      
        try {
            const response = await fetch('http://localhost:3000/user/order' , {
                method : 'POST' ,
                headers : {
                    'Content-Type' : 'application/json' ,
                    authorization : token 
                } ,
                body : JSON.stringify({
                    email ,
                    productlist
                })
             }) 
    
             if(response.ok) { 
                gateway()
                console.log('product ordered successfully')
             }
        }catch(error) {
               console.error("error : " ,error.message)
        }
    
       }

    return (
        <> 
              

        <div>
            <Navbar></Navbar>
        </div>
        <div id="mainBody" >
                   <div id="cartProducts" >
                            {cartproduct.length == 0 ? ( 
                                <div style={{display : "flex" , flexDirection : "column" , gap : "20px" , justifyContent : "center" , alignItems : "center" , width : "100%"}} > 
                                    <div id='descriptiontext' > You haven't added anything in the cart Shop here </div>
                                    <div>
                                    <Button  onClick={() => {navigate('/')}} sx={{backgroundColor : "red" , ":hover"  : { backgroundColor : "#BF3131"}}} variant="contained">Home</Button>
                                   
                                    </div>
                                   
                                </div>
                             ) : (
                                
                                    cartproduct.map((product) => ( 
                                        <div id='cardStyle' >
                                        <Cartcard 
                                        key={product._id}
                                        id={product._id}
                                        productName={product.productName}
                                        price={product.price}
                                        image={product.imageUrl} 
                                        reset={user}
                                        ></Cartcard>
                                        </div>
                                    )) 
                                   
                             )}
                          
                            
                   </div>
                   <div id="cartProductInfo" >
                         <div id="Text" >
                            Cart Total 
                         </div>
                         <div style={{display : "flex" , justifyContent : "space-between"}} >
                              <div>
                                Sub Total :
                              </div>
                              <div id='productPriceBox' >
                              ₹{subtotal}
                              </div>
                         </div> 
                         <hr style={{width : "100%"}} ></hr>
                         <div style={{display : "flex" , justifyContent : "space-between"}} >
                         <div>
                            Shipping :
                         </div> 
                         <div  id='productPriceBox' >
                            FREE
                         </div>
                         </div>
                         <hr style={{width : "100%"}} ></hr>
                         <div style={{display : "flex" , justifyContent : "space-between"}} >
                           <div>
                            Total :
                           </div> 
                              <div id='productPriceBox' >
                              ₹{subtotal}
                              </div>
                         </div>
                        
                         <div>

                         <Button  onClick={placeorder} sx={{backgroundColor : "red" , ":hover"  : { backgroundColor : "#BF3131"}}} variant="contained">Process to Checkout</Button>
                                   
                         </div>
                   </div>
        </div>
        <div>
            <Footer></Footer>
        </div>
        </>
    )
}

export default Cartpage ;