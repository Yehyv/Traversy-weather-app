require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit'); // adding rate-limit middleware to all and any routes
const weatherRoutes = require('./routes/weather');

const PORT = process.env.PORT || 3000;

const app = express();


//Rate limiting
const limiter = rateLimit({
    windowMs: 10*60*1000 , //10 Mins
    max: 50
})
app.use(limiter);
app.set('trustt proxy', 1);

//enable cors 
app.use(cors());

//Set static folder
app.use(express.static('public'));






//using routes
app.use(weatherRoutes);




app.listen(PORT , ()=>{
    console.log(`server running on ${PORT}`);
})

