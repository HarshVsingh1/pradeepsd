import './cards.css'  
import security from '../assets/security.gif'
import fast from '../assets/fast.gif' 
import lowercost from '../assets/lowercost.gif'
import global from '../assets/global.gif'
export default function Card() {
    return (
        <> 
        <div id='mainCardContainer' >

        
            <div className='cardContainer' >
                              <div>  <img className='icon' src={security} alt="icon" /> </div>
                              <div className='cardTitle' > 
                              Rock-Solid Security
                              </div>
                              <div className='cardDescription' >
                              Our blockchain payment gateway ensures top-notch security with advanced encryption and decentralized transaction verification. 
                              This eliminates the risk of fraud and unauthorized access, providing peace of mind for both merchants and customers.
                              </div>
            </div>  

            <div className='cardContainer' >
                              <div>  <img className='icon' src={fast} alt="icon" /> </div>
                              <div className='cardTitle' > 
                              Instant Payments
                              </div>
                              <div className='cardDescription' >
                              Say goodbye to lengthy settlement times. 
                              Our gateway processes transactions in real-time, ensuring that you receive payments instantly, enhancing your cash flow and operational efficiency.
                              </div>
            </div>

            <div className='cardContainer' >
                              <div>  <img className='icon' src={lowercost} alt="icon" /> </div>
                              <div className='cardTitle' > 
                              Reduced Transaction Fees
                              </div>
                              <div className='cardDescription' >
                              Traditional payment processors can charge high fees.
                               Our blockchain solution significantly lowers transaction costs, allowing you to save money and pass on the benefits to your customers.
                              </div>
            </div> 

            <div className='cardContainer' >
                              <div>  <img className='icon' src={global} alt="icon" /> </div>
                              <div className='cardTitle' > 
                              Borderless Commerce
                              </div>
                              <div className='cardDescription' >
                              Expand your market globally with ease.
                               Our gateway supports multiple cryptocurrencies, enabling you to cater to an international customer base without the hassles of currency conversion and international transaction fees.
                              </div>
            </div>
         </div>
        </>
    )
}