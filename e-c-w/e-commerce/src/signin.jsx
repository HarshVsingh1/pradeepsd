import Footer from "./components/footer"
import Navbar from "./components/navbar"
import './signup.css'
import welcome from './assets/welcome.jpeg'
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';


function Signin() { 
    
    const navigate = useNavigate()
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [servity,setServity] = useState('success')
    const [user, setUser] = useState('');
    const [message,setMessage] = useState('')
    const [open,setOpen] = useState(false) ;


    const handleChange = (event) => {
      setUser(event.target.value );
    };
    const isEmailValid = (email) => {
        // Email validation regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      };

      const handleClose = () => {
        setOpen(false)
      }

     

      
       
      
      
      const openbox = (message , servity ) => {
        setMessage(message)
            setServity(servity)
            setOpen(true)
        
        
         
      }      

      const signin = async () => {
          
       try {
              const response = await fetch(`http://localhost:3000/${user}/login` , {
                method : 'POST' ,
                headers : {
                    'Content-Type' : 'application/json'
                },
                body :  JSON.stringify({
                    email ,
                    password
                }) 
              })

              if(response.ok) {
                const data = await response.json() ;
                  sessionStorage.setItem("token", "bearer "+data.token)
                  console.log(data)
                  sessionStorage.setItem("email", data.email)
                  navigate('/')
              }else {
                console.error('Signup failed.');
                openbox('Signup failed check username password and user type','error')
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
             <div id="mainBody" >
                    <div id="imageSection" >
                            <img style={{  height : "100%" , width : "100%" ,objectFit : "cover" , borderRadius : "20px"}} src={welcome} ></img>
                    </div>
                    <div id="infoSection" >
                          <div id="text" >
                            Log in to Shop it
                          </div>
                          <div>
                            Enter your detail below
                          </div>
                          <div>
                          <FormControl sx={{width : "200px"}} >
                             <InputLabel id="demo-simple-select-label">User type</InputLabel>
                             <Select
                               labelId="demo-simple-select-label"
                               id="demo-simple-select"
                               value={user}
                               label="Choose User"
                               onChange={handleChange}
                             >
                               <MenuItem value={'admin'}>Admin</MenuItem>
                               <MenuItem value={'users'}>User</MenuItem>
                               
                             </Select>
                           </FormControl>
                          </div>
                         <div>
                          <TextField  onChange={(e) => {setEmail(e.target.value)}} id="standard-basic" label="Email" variant="standard" />
                          </div>
                          <div>
                          <TextField onChange={(e) => {setPassword(e.target.value)}} id="standard-basic" label="Password" variant="standard" />
                          </div>
                          <div>
                          <Button onClick={() => {  if(isEmailValid(email)) { signin()  } else {openbox('Enter valid email' , 'error')}  }} sx={{backgroundColor : "red" , ":hover"  : { backgroundColor : "#BF3131"}}}  variant="contained"> Log in </Button>
                          </div>
                          <div>
                            <div>
                                Don't have an account?
                            </div>
                            <div  onClick={() => {navigate('/signup')}} style={{textDecoration : "underline" , cursor : "pointer" }} >
                                Sign up
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


export default Signin 