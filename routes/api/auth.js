const express = require('express')
const bcrypt = require('bcrypt')
const  JSONwebToken  = require('jsonwebtoken')
const passport = require('passport')

const key = require('../../setup/myurl') //  the secret in myurl.js

const router = express.Router()

//  at api/auth -> this get request will be served
// @type    -  GET
// @route   -  /api/auth
// @desc    -  just for testing
// @access  -  PUBLIC
router.get('/', (req,res)=>{
    res.json({test : "Auth is being tested"})
})

// Import Schema for person to register 
const Person = require('../../models/Persons')


// @type    -  POST
// @route   -  /api/auth/register
// @desc    -  route for registration of user
// @access  -  PUBLIC
router.post('/register',(req,res)=>{
    res.send('registration takes here')
    Person.findOne({email : req.body.email}
          .then(person => {
           if(person){
           return res.status(400).json({emailerror : 'Email already registerd'})
            } else { 
                const newPerson = new Person({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    username  :req.body.password,
                    gender : req.body.gender,
                })
            }

           })
           .catch(err => console.log(err)))
})


module.exports = router ;