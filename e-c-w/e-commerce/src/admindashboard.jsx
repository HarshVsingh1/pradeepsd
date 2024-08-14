import './admindashboard.css'
import logo from './assets/shopit.png'
import PieChartIcon from '@mui/icons-material/PieChart';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Product from './components/admincomponents/products';


function Admindashboard() {
    return (
        <>
        <div id='adminBlock' >
                <div id="sidePannel" >
                     <div id='logo' >
                              <div>
                                <img style={{height : "40px"}} src={logo} ></img>
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
                                       <LeaderboardIcon sx={{color : "grey"}} ></LeaderboardIcon>
                                   </div>
                                   <div className='pannelSectionText' >
                                     Leaderboard
                                   </div>
                           </div>

                           <div className='pannelSubSection' >
                                   <div>
                                      <ShoppingCartIcon sx={{color : "grey"}} ></ShoppingCartIcon>
                                   </div>
                                   <div className='pannelSectionText' >
                                     Order
                                   </div>
                           </div>

                           <div className='pannelSubSection' >
                                   <div>
                                       <InventoryIcon sx={{color : "grey"}} ></InventoryIcon>
                                   </div>
                                   <div className='pannelSectionText' >
                                     Product
                                   </div>
                           </div>

                           <div className='pannelSubSection' >
                                   <div>
                                       <ShowChartIcon sx={{color : "grey"}} ></ShowChartIcon>
                                   </div>
                                   <div className='pannelSectionText' >
                                     Sales Report
                                   </div>
                           </div>

                           <div className='pannelSubSection' >
                                   <div>
                                       <ExitToAppIcon sx={{color : "grey"}} ></ExitToAppIcon>
                                   </div>
                                   <div className='pannelSectionText' >
                                     Sign out
                                   </div>
                           </div>
                           
                     </div>
                </div>
                <div id="viewPannel" >
                       <div id="sideNavbar" >

                       </div>
                       <div id="mainPannel" >
                           <Product></Product>
                       </div>
                </div>
        </div>
        </>
    )
}

export default Admindashboard