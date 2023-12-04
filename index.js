const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const productRouter = require('./routes/products')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order')
const app = express()
const cors = require('cors')
const port = 3000

dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(()=> console.log("db connected")).catch((err) => console.log(err))

//const corsOptions = {origin: 'http://192.168.137.1:3000/api/', credentials: true,};
//app.use(cors(corsOptions));
app.use(cors());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('MongoDB disconnected through app termination');
      process.exit(1);
    });
  });
  
  

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));

app.use('/api/products', productRouter)
app.use('/api/', authRouter)
app.use('/api/users', userRouter)
app.use('/api/carts', cartRouter)
app.use('/api/orders', orderRouter )



app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT}!`))