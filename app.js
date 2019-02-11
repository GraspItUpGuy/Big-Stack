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





const app = express()
const port = process.env.PORT || 3000;




app.get('/',(req,res)=>{
    res.send('This is the home page')
})




app.listen(port,()=>{
    console.log(`Server is up and running at port : ${port}`)
})