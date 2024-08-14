import './services.css'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function Services() {
    return (
        <>
        <div id="servicesContainer" >
             <div className='serviceIcons' >
                <div>

                <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: 'grey', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LocalShippingIcon sx={{ fontSize: '40px', color: 'white' }} />
                      </div>
                      </div>
                      </div>

                      <div className='servicesIconText' >
                        FREE AND FAST DELIVERY
                    </div>
                    <div className='serviceText' >
                        free delivery for all order above ₹499
                    </div>
             </div>
             <div className='serviceIcons' >
                <div>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: 'grey', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <HeadsetMicIcon sx={{ fontSize: '40px', color: 'white' }} ></HeadsetMicIcon>
                    </div>
                    </div>
                    </div>

                    <div className='servicesIconText' >
                        24/7 CUSTOMER SERVICES
                    </div>
                    <div className='serviceText' >
                        friendly 24/7 customer support
                    </div>
             </div>
             <div className='serviceIcons' >
                <div>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: 'grey', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                   <CheckCircleOutlineIcon sx={{ fontSize: '40px', color: 'white' }} ></CheckCircleOutlineIcon>
                </div>
                </div>
                </div>

                <div className='servicesIconText' >
                        MONEY BACK GUARANTEE
                    </div>

                    <div className='serviceText' >
                       we return money witin 30 days
                    </div>
             </div>
        </div>
        </>
    )
}

export default Services ;