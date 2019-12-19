const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const dotenv=require('dotenv')
const cors = require('cors')
//routes
const authRoute=require('./routes/auth');
const postRoute=require('./routes/post');

//connect to DB
dotenv.config();
mongoose.connect(process.env.DB_CONNECT,
{useNewUrlParser:true,useUnifiedTopology:true,family:4},
(error)=> console.log('connected to DB'+error));

//middlewares
//cet ligne pour recuper le body en json
app.use(express.json());
app.use(cors({origin : "http://localhost:3000"}));
//routes middlewares
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);


app.listen(4000,()=> console.log('Server running'));