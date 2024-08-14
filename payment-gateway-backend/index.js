const  express = require('express') 
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express()
const crypto = require('crypto');

app.use(express.json()) ; 
app.use(cors()); 



const SECRET = 'jaishreeram' 




const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  walletAddress : String ,
  apiKey : String,
  paymentRequests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentRequest'
  }]
},
{ timestamps: true });


const paymentRequestSchema = new mongoose.Schema({
  email : String ,
  price : Number ,
  hash : String ,
  paid : {
    type : Boolean ,
    default : true
  } ,
  status: {
      type: Boolean,
      default: false,
  }
});






const adminSchema = mongoose.Schema({
    username : String , 
    email : String ,
    password : String ,
    
})








const User = mongoose.model('User' , userSchema) ;
const Admin = mongoose.model('Admin' , adminSchema) ;
const PaymentRequest = mongoose.model('PaymentRequest', paymentRequestSchema);

mongoose.connect('mongodb+srv://harsh:Geetasingh%40098@cluster0.wifoeru.mongodb.net/?retryWrites=true&w=majority', { dbName: "decentrapay" });

function generateApiKey() {
  return crypto.randomBytes(20).toString('hex');
}



app.post('/admin/signup', async(req, res) => {
  const { username, password , email } = req.body;
  const admin = await Admin.findOne({email})
    if (admin) {
      res.status(403).json({ message: 'Admin already exists' });
    } else {
      const obj = { username: username, password: password  , email : email};
      const newAdmin = new Admin(obj);
      newAdmin.save();
      const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Admin created successfully', token });
    }

  
});



app.post('/admin/login', async (req, res) => {
  const { email , password } = req.body;
  const user = await Admin.findOne({ email});
  console.log(user)
  if (user && user.password == password) {
    const token = jwt.sign({ email, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token ,  email : user.email });
  } else {
    res.status(403).json({ message: 'Invalid username or password'  });
  }
});


app.post('/users/signup', async (req, res) => {
  const { username, password  , email} = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = new User({ username, password ,email});
    await newUser.save();
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token  , email });
  }
});

app.post('/users/login', async (req, res) => {
  const { email , password } = req.body;
  const user = await User.findOne({ email});
  console.log(user)
  if (user && user.password == password) {
    const token = jwt.sign({ email, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token ,  email : user.email });
  } else {
    res.status(403).json({ message: 'Invalid username or password'  });
  }
});


app.get('/users', async (req, res) => {
  try {
    const last10Users = await User.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(last10Users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/paymentrequests', async (req, res) => {
  try {
    const paymentRequests = await PaymentRequest.find();
    res.status(200).json(paymentRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

  

app.post('/generate/key', async (req, res) => {
  const { email, walletAddress } = req.body;

  if (!email || !walletAddress) {
    return res.status(400).send('Email and wallet address are required');
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const apiKey = generateApiKey();

    user.walletAddress = walletAddress;
    user.apiKey = apiKey;

    await user.save();

    res.status(200).send({ apiKey });
  } catch (error) {
    console.error('Error :', error);
    res.status(500).send('error');
  }
});

app.post('/get/api/key', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).send({ apiKey: user.apiKey });
  } catch (error) {
    console.error('Error :', error);
    res.status(500).send('Server error');
  }
});







  


  







  app.post('/payment/request', async (req, res) => {
    const { email , price , hash} = req.body;
    console.log(req.body)
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const paymentRequest = new PaymentRequest({
            email ,
            price ,
            hash ,
            status: true
        });
        const savedpaymentRequest = await paymentRequest.save();

        user.paymentRequests.push(savedpaymentRequest._id);
        await user.save();


        return res.status(200).json({ message: 'Payment request saved successfully' });
    } catch (error) {
        console.error('Error saving Payment request:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});





app.post('/user/payments', async (req, res) => {
  const { userEmail } = req.body;

  try {
      const user = await User.findOne({ email: userEmail }).populate('paymentRequests');
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user.paymentRequests);
  } catch (error) {
      console.error('Error fetching payments:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});








app.post('/payment/request', async (req, res) => {
  const { userEmail } = req.body;

  try {
      const user = await User.findOne({ email: userEmail }).populate({
          path: 'paymentRequests',
      });

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user.appointmentRequests);
  } catch (error) {
      console.error('Error fetching payments:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});




  app.get('/appointments/', async (req, res) => {
    const userEmail = req.body

    try {
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ appointmentRequests: user.appointmentRequests });
    } catch (error) {
        console.error('Error fetching appointment requests:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  }); 



  
  
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });




  

 






  