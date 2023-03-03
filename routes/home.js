const express = require('express')
const router = express.Router()
const {checkAuthenticated, checkNotAuthenticated} = require('../userAuth')

router.get('/', checkAuthenticated, (req, res) => {
    res.render('home')
})

module.exports = router