const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Import Schema for person to register   and  for profile
const Person = require('../../models/Persons')
const Profile= require('../../models/Profile')
 
// Load Question Model
const Question = require('../../models/Question')


// dummy route for testing
// // @type    -  GET
// // @route   -  /api/questions
// // @desc    -  just for testing
// // @access  -  PUBLIC
// router.get('/', (req,res)=>{
//     res.json({question : "question is success"})
// })

// @type    -  GET
// @route   -  /api/questions
// @desc    -  just for showing all questions
// @access  -  PUBLIC
router.get('/', (req,res)=>{
    Question.find()
            .sort({ date:'desc'}) // from stackOverflow
            .then( questions => res.json(questions))
            .catch( console.log('No questions found in db to display => questions.js '))
})


// @type    -  POST
// @route   -  /api/questions
// @desc    -  just for submitting questions
// @access  -  PRIVATE
router.post('/', passport.authenticate('jwt', {session : false}), (req,res)=>{
    const  newQuestion = new Question({
        textOne : req.body.textOne,
        textTwo : req.body.textTwo,
        user : req.user.id,
        name : req.body.name,

    })
    newQuestion.save()
               .then(question =>{ 
                   res.json(question)
               })
               .catch(console.log('unable to push questions to db => questions.js '))
})

module.exports = router ;