const express = require('express')
const router = express.Router()

//  at api/auth -> this get request will be served
// @type    -  GET
// @route   -  /api/auth
// @desc    -  just for testing
// @access  -  PUBLIC
router.get('/', (req,res)=>{
    res.json({test : "Auth is success"})
})

module.exports = router ;