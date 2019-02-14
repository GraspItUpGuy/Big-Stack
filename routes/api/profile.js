const express = require('express')
const router = express.Router()

//  at api/profile -> this get request will be served
// @type    -  GET
// @route   -  /api/auth/profile
// @desc    -  just for testing the profile route
// @access  -  PUBLIC
router.get('/profile', (req,res)=>{
    res.json({profile : "Profile is added successfully "})
})

module.exports = router ;