import './admindashboard.css'
import logo from './assets/logo.png'
import PieChartIcon from '@mui/icons-material/PieChart';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Sidenavbar from './components/sidenavbar';
import { useState } from 'react';
import AppointmentTables from './components/appointments';
import { useNavigate } from 'react-router-dom';
import HomeTables from './components/paymentsrequest';
import AdminHomeTables from './components/userrequest';


function Admindashboard() { 

  const [activeComponent, setActiveComponent] = useState('home');

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('token')
    navigate('/')
  }

    return (
        <>
        <div id='adminBlock' >
                <div id="sidePannel" >
                <div id='logo' >
                              <div>
                                <img  onClick={() => {navigate('/')}} style={{height : "40px"}} src={logo} ></img>
                              </div> 
                              <div className='logosidetext' >
                                DECENTRAPAY
                              </div>
                     </div>
                     <div id='sidePannelDashboardText' >
                         <div>
                               <PieChartIcon sx={{color : "white"}} ></PieChartIcon>
                         </div> 
                         <div style={{color : "white"}}  className='text' >
                            DASHBOARD
                         </div>
                     </div>
                     <div id='pannelSection' >
                           <div className='pannelSubSection' >
                                   <div>
                                       
                                       <HomeIcon sx={{color : "grey"}} ></HomeIcon>
                                   </div>
                                   <div  onClick={() => {handleButtonClick('home')}} className='pannelSectionText' >
                                     Home
                                   </div>
                           </div>

                           <div className='pannelSubSection' >
                                   <div>
                                      
                                      <FormatListBulletedIcon sx={{color : "grey"}} ></FormatListBulletedIcon>
                                   </div>
                                   <div onClick={() => {handleButtonClick('users')}} className='pannelSectionText' >
                                     Users
                                   </div>
                           </div>

                         

                          

                        

                           <div className='pannelSubSection' >
                                   <div>
                                       <ExitToAppIcon sx={{color : "grey"}} ></ExitToAppIcon>
                                   </div>
                                   <div onClick={logout} className='pannelSectionText' >
                                     Sign out
                                   </div>
                           </div>
                           
                     </div>
                </div>
                <div id="viewPannel" >
                       <div id="sideNavbar" >
                                   <Sidenavbar></Sidenavbar>
                       </div>
                       <div id="mainPannel" >
                           {/* <Product></Product> */}  

                           <div className='mainTitle' >
                            {activeComponent === 'home' && 
                             <div className='profileHeading' >
                             <div className='profileHeadingText' >
                                Latest Payments
                             </div>
                             </div>} 
                            {activeComponent === 'users' &&   "New Users"  } 
                           
                            
                           </div> 
                           <div className='mainContainer' >
                                {activeComponent === "home" &&  <AdminHomeTables></AdminHomeTables>}
                                {activeComponent === 'users'  && <AppointmentTables></AppointmentTables>}
                               
                                
                           </div>
                       </div>
                </div>
        </div>
        </>
    )
}

export default Admindashboard