const express = require('express')
const router = express.Router()

//  at api/question -> this get request will be served
router.get('/', (req,res)=>{
    res.json({question : "question is success"})
})

module.exports = router ;