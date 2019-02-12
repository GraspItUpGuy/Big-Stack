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
    // res.send('registration takes here')
    Person.findOne({email : req.body.email}) // then & catch to avoid runtime errors
          .then(person => {
            //   console.log('aaaaaaaaaaaa')
           if(person){  // if=> user has already registered once
           return res.status(400).json({emailerror : 'Email already registerd'})
            } else{   // in case he is registering for the first time
                // console.log('aaaa')
                const newPerson = new Person({
                    // getting the required fields form the person
                    
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    username  :req.body.username,
                    gender : req.body.gender,
                })
                // encrypt password using bcrypt   => taken from documentation
                const saltRounds = 10;
                const someOtherPlaintextPassword = 'not_bacon';
                bcrypt.genSalt(saltRounds, (err, salt)=> {
                    bcrypt.hash(newPerson.password, salt,(err, hash)=> {
                        // Store hash in your password DB.
                        if(err){ throw err} // incase error occours in hashing
                        newPerson.password = hash;
                        newPerson.save() //use .then &.catch in case db error occours 
                                 .then( person => {res.json(person)}) // if user regsteresd successfully => grab all these deatils
                                 .catch(() => console.log(' error occured in then block'))
                     });
                });
            }
        

           })
           .catch(() => console.log('error occured in flow inside the then block '))
})


// @type    -  GET
// @route   -  /api/auth/login
// @desc    -  just for login of users
// @access  -  PUBLIC
router.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password
    // password comes in clear text format, hence hashing using bcrypt is required
    Person.findOne({email})
        .then(person => {
            if( !person){
                return res.status(404).json({emailerror : 'user not found'})
            } 
              bcrypt.compare(password,person.password)
                     .then(isCorrect =>{
                        if(isCorrect){
                            res.json({success : 'User is logged in successfully'})
                            // use payload and create token for user
                        } else{
                            res.status(400).json({passworderror : 'incorrect password'})
                        }
                     })
                     .catch( console.log('error occured'))
            
        })
        .catch(console.log(' error encounterd in the route'))
})

module.exports = router ;