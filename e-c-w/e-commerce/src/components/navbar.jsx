import { useEffect, useState } from 'react';
import './navbar.css'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/shopit.png'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function Navbar() {
    
  
   
    const token = sessionStorage.getItem("token")
    const email = sessionStorage.getItem('email')
    const [Token , setToken] = useState(null)
    const navigate = useNavigate();
    

  useEffect(() => {
    setToken(token)
  }, [token])
  

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        border : "1px solid black" ,
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  

    return <div style={{margin : "10px"}} >
           <div id="navBar">
    <div >
        <img onClick={() => {navigate('/')}} id="logo" src={logo} alt='my logo'></img>
    </div>

    <div id='navButton'>
              <div  onClick={() => {navigate('/')}} className='navButtons'>
                 Home
              </div> 
              <div className='navButtons'>
                 About
              </div>
              {token ? (<div onClick={() => {  sessionStorage.removeItem('token')  
                 navigate('/')}} className='navButtons'>
                 Logout
              </div> ) : (<div onClick={() => {navigate('/signup')}} className='navButtons'>
                 Sign Up
              </div> )}

              {token && 
                 
                        <div  onClick={() => {navigate('/order')}} className='navButtons'>
                 Orders
              </div> 
                }
              
             
    </div> 
    <div>
    <div style={{margin : "0 20px" , width : "200px" , height : "100%" , display : "flex" , alignItems : "center" }} >
              <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
              </div>
    </div> 
    
    {token ? (<div style={{display : "flex" , alignItems : "center"}} >
      {email}
    </div>) : (<div>
      
    </div>)}
    

    <div onClick={() => {navigate('/cart')}} id='cartIcon' >
    <IconButton  sx={{backgroundColor : "grey" , ":hover"  : { backgroundColor : "grey"}}} aria-label="cart"> 
      <StyledBadge  badgeContent={1} color="secondary">
        <ShoppingCartIcon  sx={{color : "white" ,   borderRadius : "10px"  }} />
      </StyledBadge>
    </IconButton>
    </div>
</div> 
<hr style={{margin : " 0 20px"}} ></hr>
    </div>


}

export default Navbar ;