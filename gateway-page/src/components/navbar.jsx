import './navbar.css'
import  logo from '../assets/logo.png'
import { Link } from 'react-scroll'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Navbar() {

  const token = sessionStorage.getItem("token")
  const email = sessionStorage.getItem('email')
  const [Token , setToken] = useState(null)

  useEffect(() => {
    setToken(token)
  }, [token])  

  const navigate  = useNavigate() ;

  
    return (
        <> 
         <div id="navBar">
                               <div style={{display : 'flex' , justifyContent : "center" , alignItems : "center"}} >
                                   <img onClick={() => {navigate('/')}} id="logo" src={logo} alt='my logo'></img> 
                                   <div className='logotext' >
                                   Decentrapay
                                   </div>
                               </div>

                               <div id='navButton'>
                                         <div className='navButtons'>
                                         <Link to="productSection" smooth={true} duration={1000}>
                                           Product
                                         </Link>
                                          
                                         </div> 
                                         <div className='navButtons'>
                                          <Link to='Features' smooth={true} duration={800}>
                                            Features
                                          </Link>
                                         </div>
                                         <div className='navButtons'>
                                          <Link to='contact' smooth={true} duration={1100}>
                                            Creators
                                          </Link>   

                                         </div> 
                                         {token ? (<div onClick={() => {  sessionStorage.removeItem('token')  
                                              navigate('/')}} className='navButtons'>
                                              Logout
                                           </div> ) : (<div style={{cursor : "pointer"}}  onClick={() => {navigate('/signup')}} className='navButtons'>
                                              Sign Up
                                              </div> )}
                               </div>
                        </div>
        </>
    )
}