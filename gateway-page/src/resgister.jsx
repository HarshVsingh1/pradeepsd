


import tagSideImage from './assets/homepagewallpaper.png'

import './App.css'
import { Alert, Button, Snackbar  } from '@mui/material';

import { Link } from 'react-scroll';
import Card from './components/cards';
import Schemes from './components/schemes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';

function Homapage() {

  const token = sessionStorage.getItem("token")
  const email = sessionStorage.getItem('email')
  const [Token , setToken] = useState(null)
  const [message,setMessage] = useState('')
  const [servity,setServity] = useState('success')
  const [open,setOpen] = useState(false) ;

  const navigate = useNavigate();
  
  const handleClose = () => {
    setOpen(false)
  }

  
  
  const openbox = (message , servity ) => {
    setMessage(message)
        setServity(servity)
        setOpen(true)
    
    
     
  }
useEffect(() => {
  setToken(token)
}, [token])


    return <>
              

              <div id="header"> 
                      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={servity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar> 
                           <Navbar></Navbar>
                        <hr style={{margin : "0 5%"}}></hr>

                            <div id='tagContainer'>
                                <div>
                                <div id='tagline'>
                                Seamless Crypto Payments for the   <span id='typinganimation'>  Future of E-commerce .</span>
                                </div>
                                <div id='subTagline'>
                                Welcome to our blockchain payment gateway, designed to revolutionize the e-commerce landscape by providing a secure, efficient, and transparent payment solution.
                                 Our gateway integrates seamlessly with your e-commerce platform, allowing customers to make purchases using various cryptocurrencies. 
                                 This not only broadens your customer base but also ensures that transactions are quick and secure, reducing the risk of fraud and chargebacks.
                                 Experience the future of payments with our cutting-edge technology.
                                </div>
                                <div id='launchButton' >
                                  <Link to='Features' smooth={true} duration={800}>
                                <Button onClick={() => {  if (email) {
    navigate('/userdashboard');
  } else {
    openbox("Signup before making a key", "error");
  }}} className='lbutton' sx={{ backgroundColor : "#03045e" , width : '300px' }} variant="contained">Make an api key </Button>
                                  </Link>
                                
                                </div>
                                </div>
                                <div >
                                           <img  id='tagimage' className='rightAnimation' src={tagSideImage} alt='tagSideImage' ></img>
                                </div>
                            </div>

              </div> 

              <div>
                        <Card></Card>
                    </div>  

                   <div>
                    <Schemes></Schemes>
                   </div>

                  
                  <div>
                    <Footer></Footer>
                  </div>
                   
    </>


}

export default Homapage ;