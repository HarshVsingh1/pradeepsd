
import './App.css';
import Gateway from './gateway';
// import Register from './registerapi';
import { BrowserRouter as   Router ,Route, Routes } from 'react-router-dom'
import Resgister from './resgister';
import Signup from './signup'
import Signin from './signin'
import Userdashboard from './userdashboard';
import Admindashboard from './admindashboard';

function App() {
      
  return (
    <div>
             <Router>
                       <Routes>
                         <Route path='/' element={<Resgister></Resgister>} />
                         <Route path='/gateway' element={<Gateway></Gateway>} />
                         <Route path='/userdashboard' element={<Userdashboard></Userdashboard>} />
                         <Route path='/admindashboard' element={<Admindashboard></Admindashboard>} />
                         <Route path='/signup' element={<Signup></Signup>} />
                         <Route path='/signin' element={<Signin></Signin>} />   
                       </Routes>
             </Router>
    </div>
  )

}

export default App;