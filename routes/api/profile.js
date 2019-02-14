const express = require('express')
const router = express.Router()
const mongoose  =require ('mongoose')
const passport = require('passport') 


// Import Schema for person to register   and  for profile
const Person = require('../../models/Persons')
const Profile= require('../../models/Profile')

//  at api/profile -> this get request will be served
// @type    -  GET
// @route   -  /api/profile
// @desc    -  just for  personal  user profile
// @access  -  PRIVATE
router.get('/',passport.authenticate('jwt', {session : false}),(req,res)=>{
     Profile.findOne({user : req.user.id})
           .then(profile =>{
               if(! Profile){
                 return res.status(404).json({profilenotfounderror : 'No profile found'})

               }
               res.json(profile)
           })
           .catch(console.log('got some error in in profile => api/profile'))
})

module.exports = router ;