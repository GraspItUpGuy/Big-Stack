const express = require('express')
const router = express.Router()

//  at api/question -> this get request will be served
// @type    -  GET
// @route   -  /api/questions
// @desc    -  just for testing
// @access  -  PUBLIC
router.get('/', (req,res)=>{
    res.json({question : "question is success"})
})

module.exports = router ;