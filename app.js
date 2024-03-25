const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const userRouter = require('./Routes/user');

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(userRouter);

mongoose.connect(process.env.MONGO_DB_CREDENTIAL)
.then(()=>{
    app.listen(3000,()=>{
        console.log("running on port 3000");
    })
})
.catch((err)=>{
    console.log("db connection failed",err);
})
