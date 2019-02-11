// requiring all the dependencies
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const bcrypt = require('bcrypt')
const expressSESSION = require('express-session')
const validator = require('validator')
const JSONwebToken = require('jsonwebtoken')
const mongoose = require('mongoose')
const path = require('path')


// mongoDB configuration : 
const db = require('./setup/myurl').mongoURL;     
// db contains the mongoURL present in the ./setup/myurl.js

// attempt to connect to database and use promise to handle the situations in 
// the connection to tht db fails...  => using .then().catch()
mongoose
        .connect(db)
        .then(()=> console.log('db connected'))
        .catch(err => console.log(err)) 



// app setup and port declaration
const app = express()
const port = process.env.PORT || 3000;



// home route
app.get('/',(req,res)=>{
    res.send('This is the home page of big stack')
})



// listening app at port
app.listen(port,()=>{
    console.log(`Server is up and running at port : ${port}`)
})