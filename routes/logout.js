const express = require('express')
const router = express.Router()
const {checkAuthenticated, checkNotAuthenticated} = require('../userAuth')

router.delete('/', checkAuthenticated, (req, res, next) => {
    req.logOut(function(err){
        if(err) {
            return next(err)
        }
    })
    res.redirect('/login')
})

module.exports = router