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

// @type    -  GET
// @route   -  /api/profile
// @desc    -  just for UPDATING/SAVING personal  user profile
// @access  -  PRIVATE
router.post('/',passport.authenticate('jwt', {session : false}),(req,res)=>{
   const profileValues ={};
   // large giantic object to be filled with profile values
   profileValues.user = req.user.id;
   if(req.body.username)  { profileValues.username =req.body.username  }
   if(req.body.website)   { profileValues.website =req.body.website  }
   if(req.body.portfolio) { profileValues.portfolio =req.body.portfolio  }
   if(req.body.country)   { profileValues.country =req.body.country  }
   if(req.body.languages != undefiend){
       profileValues.languages = req.body.languages.split(',')
    } // languages to be comming seperated on basis of ',', hence splitting them
    if(req.body.youtube)   { profileValues.youtube =req.body.youtube  }
    if(req.body.facebook)   { profileValues.facebook =req.body.facebook  }
    if(req.body.instagram)   { profileValues.instagram =req.body.instagram  }
    if(req.body.github)   { profileValues.github =req.body.github  }
    if(req.body.linkedin)   { profileValues.linkedin =req.body.linkedin}

})


module.exports = router ;
