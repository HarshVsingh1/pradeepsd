import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import  './sidenavbar.css'
export default function Sidenavbar() { 

    const userEmail = sessionStorage.getItem('email')

    return (
        <> 
        <div className='sideNavbarContainer' >
                    <div className='profileContainer' > 
                          <div className='profileContainertwo' >

                          
                        <div>

                        <AccountCircleIcon  sx={{color : "grey" , width : "50px" , height : "50px"}} ></AccountCircleIcon> 
                        </div>
                        <div>
                               {userEmail}
                        </div>
                        </div>
                        <div>
                       <NotificationsIcon></NotificationsIcon>
                    </div>
                    </div>
                    
        </div>
        </>
    )
}