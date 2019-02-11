const express = require('express')
const router = express.Router()

//  at api/auth -> this get request will be served
router.get('/', (req,res)=>{
    res.json({test : "Auth is success"})
})

module.exports = router ;