import axios from 'axios'
import './api.css'
import { Alert, Button, Snackbar, TextField } from '@mui/material'
import { useState } from 'react'

export default function Api() {
   const email = sessionStorage.getItem('email') 
   const [message,setMessage] = useState('')
   const [servity,setServity] = useState('success')
   const [open,setOpen] = useState(false) ;
   const [apikey,setApikey] = useState('Api will be generated here')
   const [walletAddress,setwalletAddress] = useState('')

   const handleClose = () => {
    setOpen(false)
  }

  
  
  const openbox = (message , servity ) => {
    setMessage(message)
        setServity(servity)
        setOpen(true)
    
    
     
  }

   const makekey = async() => {
    const response = await axios.post('http://localhost:3001/generate/key',{email , walletAddress }) 
    console.log(response) 
    setApikey(response.data.apiKey)
    openbox("Api Key is generated save it" , "success")
   }
    return (
        <div> 
              <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={servity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar> 
                       <div className='apibox' >
                                    <div>
                                            <div className='walletaddresscontainer' > 
                                                <div className='walletaddresstext' >                   
                                                        Enter your wallet address where you want to receive Ether
                                                </div>
                                                <div>
                                                <TextField onChange={(e) => {setwalletAddress(e.target.value)}} sx={{width : "570px"}} id="outlined-basic" label="Wallet Address" variant="outlined" />
                                                </div>
                                                
                                                <div>
                                                 <Button  onClick={makekey}  sx={{backgroundColor : "BLACK" , width : "570px" , ":hover"  : { backgroundColor : "GREY"}}}  variant="contained"> GENERATE API KEY </Button>
                                                 </div>
                                            </div>
                                            
                                    </div>
                                    <div className='walletaddresscontainer' >
                                         
                                         <div className='walletaddresstext' >                   
                                                        Your generated Api Key
                                                </div>
                                         
                                         <div className='apitext' >
                                            {apikey}
                                         </div> 
                                         <div className='walletaddresstext' >
                                             Read docs to integrate it 
                                         </div>
                                    </div>
                       </div>
        </div>
    )
}