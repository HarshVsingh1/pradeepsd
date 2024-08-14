import Footer from "./components/footer"
import Navbar from "./components/navbar"
import './signup.css'
import welcome from './assets/welcome.png'
import { Alert, Button, Snackbar, TextField } from "@mui/material"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';

function Signup() { 

    const navigate = useNavigate()
    
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [message,setMessage] = useState('')
    const [servity,setServity] = useState('success')
    const [open,setOpen] = useState(false) ;

    const isEmailValid = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailPattern.test(email);
        console.log(`Email: ${email}, Valid: ${isValid}`);
        return isValid;
      };
      

      const handleClose = () => {
        setOpen(false)
      }

      
      
      const openbox = (message , servity ) => {
        setMessage(message)
            setServity(servity)
            setOpen(true)
        
        
         
      }

      const signup = async () => {
          
        try { 
              
               const response = await fetch(`http://localhost:3001/users/signup` , {
                 method : 'POST' ,
                 headers : {
                     'Content-Type' : 'application/json'
                 },
                 body :  JSON.stringify({
                    name,
                     email ,
                     password
                 }) 
               })
               console.log(response)
               if(response.ok) { 
                const data = await response.json() ;
                   sessionStorage.setItem("token", "bearer "+data.token)
                   sessionStorage.setItem("email", data.email)
                   navigate('/')
               }else {
                 
                 openbox('Signup failed.','error')
        }
        }
        catch (error) {
         console.error('Error during signup:', error.message);
         openbox('Error during signup' , 'error')
        }
        
       }

    return (
        <>
        <div>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={servity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar> 
             <div>
                <Navbar></Navbar>
             </div>
             <hr style={{margin : "0 5%"}}></hr>
             <div id="mainBody" >
                    <div id="imageSection" >
                            <img style={{  height : "100%" , width : "100%" ,objectFit : "cover" , borderRadius : "20px"}} src={welcome} ></img>
                    </div>
                    <div id="infoSection" >
                          <div id="text" >
                            Create an Account
                          </div>
                          <div>
                            Enter your detail below
                          </div>
                          <div>
                          <TextField onChange={(e) => {setName(e.target.value)}} id="standard-basic" label="Name" variant="standard" />
                          </div>
                          <div>
                          <TextField  onChange={(e) => {setEmail(e.target.value)}} id="standard-basic" label="Email" variant="standard" />
                          </div>
                          <div>
                          <TextField onChange={(e) => {setPassword(e.target.value)}} id="standard-basic" label="Password" variant="standard" />
                          </div>
                          <div>
                          <Button onClick={() => {  if(isEmailValid(email)) { signup()  } else {openbox('Enter valid email' , 'error')}  }} sx={{backgroundColor : "red" , ":hover"  : { backgroundColor : "#BF3131"}}}  variant="contained"> Create Account </Button>
                          </div>
                          <div>
                            <div>
                                Already have an account?
                            </div>
                            <div  onClick={() => { navigate('/signin') }} style={{textDecoration : "underline" , cursor : "pointer" }} >
                                Log in 
                            </div>
                          </div>
                    </div>
             </div>
             <div>
                <Footer>

                </Footer>
             </div>
        </div>
        </>
    )
}


export default Signup