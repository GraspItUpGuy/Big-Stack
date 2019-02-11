const express = require('express')
const router = express.Router()

//  at api/profile -> this get request will be served
// @type    -  GET
// @route   -  /api/profile
// @desc    -  just for testing
// @access  -  PUBLIC
router.get('/', (req,res)=>{
    res.json({profile : "Profile is added successfully "})
})

module.exports = router ;