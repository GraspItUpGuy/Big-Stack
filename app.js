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


// app setup and port declaration
const app = express()
const port = process.env.PORT || 3000;

// Middlewares for Express
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());


// bring all the routes
// auth route
const auth = require("./routes/api/auth");
// profile router
const questions  = require("./routes/api/questions")
// question route
const profile  = require("./routes/api/profile")




// mongoDB configuration : 
const db = require('./setup/myurl').mongoURL;     
// db contains the mongoURL present in the ./setup/myurl.js

// attempt to connect to database and use promise to handle the situations in 
// the connection to that db connection fails...  => using .then().catch()
mongoose
        .connect(db)
        .then(()=> console.log('db connected successfully'))
        .catch(err => console.log(err)) 

// Passport middlewares
app.use(passport.initialize())


// config for JWT Strategy
require("./Strategies/jsonWTStrategy")(passport)




// // home route => just for testing
// app.get('/',(req,res)=>{
//     res.send('This is the home page of big stack')
// })

// actual routes
app.use('/api/auth', auth);
app.use('/api/profile',profile )
app.use('/api/questions',questions)


// listening app at port
app.listen(port,()=>{
    console.log(`Server is up and running at port : ${port}`)
})