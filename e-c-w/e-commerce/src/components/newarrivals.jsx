import './newarrivals.css'
import playstation from '../assets/playstation.png'
import perfume from '../assets/perfume.png'
import dress from '../assets/dress.png'
import headphone from '../assets/headphone.png'
import modal from '../assets/modal.png'
import headphoneTwo from '../assets/headphoneTwo.png'
function Newarrival() {
    return (
         <>
         <div>
         <div id='cardBlockNewarrival' >
                     <div id="title" >
                            <div id="block" >
                                    
                            </div>
                            <div id='titleText' >
                                Featured
                            </div>
                     </div>
                     <div id="subTitleAndTime" >
                            <div id='subTitleAndTitleText' >
                                New Arrival
                            </div>
                     </div>

                     <div id='featuredCard' >
                           <div id="featuredOne" >
                                    <img src={headphoneTwo} ></img>
                           </div>
                           <div id='featuredCardTwo' >
                                   <div id='featuredTwoBox' >
                                    <div id='featuredTwo' >
                                        <img src={modal} className='image'  ></img>

                                    </div>
                                     
                                   </div>
                                   <div id='featuredCardThree' >
                                           <div className='featuredThree' >
                                           <img src={perfume}  className='image'   ></img>
                                           </div>
                                           <div className='featuredThree' >
                                           <img src={dress}  className='image'   ></img>
                                           </div>
                                           <div className='featuredThree' >
                                           <img src={headphone}  className='image'   ></img>
                                           </div>
                                           
                                   </div>
                           </div>
                     </div>
                     
              </div>
         </div>
        </>
    )
}

export default Newarrival