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
   if(req.body.languages !== undefiend){
       profileValues.languages = req.body.languages.split(',')
    } // languages to be coming seperated on basis of ',' , hence splitting them
    profileValues.social = {}
    if(req.body.youtube)   { profileValues.social.youtube =req.body.youtube  }
    if(req.body.facebook)   { profileValues.social.facebook =req.body.facebook  }
    if(req.body.instagram)   { profileValues.social.instagram =req.body.instagram  }
    if(req.body.github)   { profileValues.social.github =req.body.github  }
    if(req.body.linkedin)   { profileValues.social.linkedin =req.body.linkedin}
 
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
                            //save user
                            new Profile(profileValues)
                                                   .save()
                                                   .then( profile => res.json(profile))
                                                   .catch(console.log('érror => save user => profile.js'))
                        })
                        .catch( console.log('error ocurred => //database stuff => profile.js'))
              }
          } )
          .catch(console.log('problem in fetching profile => profile.js =>// database stuff'))
          
          

})

// @type    -  GET
// @route   -  /api/profile/:username
// @desc    -  just for  getting user profile using USERNAME
// @access  -  PUBLIC
router.get('/:username', (req,res)=>{
  Profile.findOne({username : req.params.username})
        .populate("user", [ "name", "profilepic"])
        .then( profile=>{
            if(!profile){
                res.status(404).json({usernamenotfound : "Oops ! user not found"})
            }
            res.json(profile);
        })
        .catch(console.log("database error, can't fetch the user via username => profile.js"))
})

// @type    -  GET
// @route   -  /api/profile/:id
// @desc    -  just for  getting user profile using USERNAME
// @access  -  PUBLIC
router.get('/id', (req,res)=>{
    Profile.findOne({id : req.params.id})
          .populate("user", [ "name", "profilepic"])
          .then( profile=>{
              if(!profile){
                  res.status(404).json({idnotfound : "Oops ! user not found"})
              }
              res.json(profile);
          })
          .catch(console.log("database error, can't fetch the user via id => profile.js"))
  })


// @type    -  GET
// @route   -  /api/profile/everyone
// @desc    -  just for  getting user profile of EVERYONE
// @access  -  PUBLIC
// /find bcoz the /everyone was a bug that considered everyone as a username
router.get('/find/everyone', (req,res)=>{
    Profile.find()
          .populate("user", [ "name", "profilepic"])
          .then( profiles=>{
              if(!profiles){
                  res.status(404).json({NoProfileWasFound : "No profiles were found"})
              }
              res.json(profile);
          })
          .catch(console.log("database error, can't fetch any profiles"))
  })
  
// @type    -  DELETE
// @route   -  /api/profile/
// @desc    -  just for  DELETING user based on mongoID
// @access  -  PRIVATE
router.delete('/', passport.authenticate('jwt', { session : false}), (req,res)=>{
    Profile.findOne({user : req.user.id})
     // no then and catch bcoz we don't want to do anything if id is not found
    Profile.findOneAndRemove({user : req.user.id}) 
          .then(()=>{
              Person.findOneAndRemove({ _id : req.user.id})
                    .then( ()=> { res.json({ success : "deletion successful"})})
                    .catch(console.log('error is deletion from authentication section => profile.js'))
          })
          .catch(console.log(' error in the deletion of the user => profile.js'))
})



// @type    -  DELETE
// @route   -  /api/profile/workrole
// @desc    -  just for  adding work profile of the user
// @access  -  PRIVATE
router.post('/workrole',passport.authenticate('jwt',{session : false}), (req,res)=>{
Profile.findOne( {user : req.user.id})
    .then( profile =>{
        if(!profiles){
            res.status(404).json({NoProfileWasFound : "No profiles were found"})
        } else {
            const newWork = {
                role : req.body.role,
                company : req.body.company,
                country : req.body.country,
                from : req.body.from,
                to : req.body.to,
                current : req.body.current,
                details : req.body.details,
                
            }
            profile.workrole.push(newWork)
            profile.save()
                  .then( profile =>{
                      res.json((profile))
                  })
                  .catch( console.log("error in adding workrole to the db =>profile.js "))
        }

    }) 
    .catch(console.log('db error in route => /mywork => profile.js'))})
   

// @type    -  DELETE
// @route   -  /api/profile/workrole/:workrole_id
// @desc    -  just for deleting a specific workrole
// @access  -  PRIVATE
router.delete('/workrole/:workrole_id',passport.authenticate('jwt',{session : false}),(req,res)=>{
    Profile.findOne({user : req.user.id})
          .then( profile =>{
            if(!profiles){
                res.status(404).json({NoProfileWasFound : "No profiles were found"})
            } else{
                const removethis = profile.workrole
                                         .map(item =>{item.id })
                                         .indexOf(req.params.workrole_id)
                profile.workrole.splice(remove, 1)
                
                profile.save()
                      .then( profile => res.json(profile))
                      .catch(console.log("db error in saving deletion => workrole/:workrole_id => profile.js"))
            }
          })
          .catch(console.log('db error => /workrole/:workrole_id => profile.js'))
} )


module.exports = router  ;
