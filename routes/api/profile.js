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
    } // languages to be coming seperated on basis of ',' , hence splitting them
    if(req.body.youtube)   { profileValues.youtube =req.body.youtube  }
    if(req.body.facebook)   { profileValues.facebook =req.body.facebook  }
    if(req.body.instagram)   { profileValues.instagram =req.body.instagram  }
    if(req.body.github)   { profileValues.github =req.body.github  }
    if(req.body.linkedin)   { profileValues.linkedin =req.body.linkedin}
 
    // data collection done...

    // Database stuff
    Profile.findOne({user : req.user.id})
          .then(profile => {
              if(profile){
                  Profile.findOneAndUpdate(
                      { user : req.user.id},
                      { $set : profileValues},
                      { new  : true},
                  ).then(
                      profile => res.json(profile) 
                  ).catch(console.log('Problem in updating => profile.js'))
              } else {
                  Profile.findOne({username : profileValues.username})
                        .then(profile => { 
                            if(profile){
                                res.status(400).json({username : 'username already esists'})
                            }
                        })
                        .catch( console.log('error ocurred => //database stuff => profile.js'))
              }
          } )
          .catch(console.log('problem in fetching profile => profile.js =>// database stuff'))
          
          

})


module.exports = router ;
