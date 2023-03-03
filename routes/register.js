const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {checkAuthenticated, checkNotAuthenticated} = require('../userAuth')

// Render registration form
router.get('/', checkNotAuthenticated, (req, res) => {
  res.render('register');
});

// Handle registration form submission
router.post('/', checkNotAuthenticated, async (req, res) => {
    try{
        const hashedPass = await bcrypt.hash(req.body.password, 10)

        const newUser = new User({
            name : req.body.name,
            email: req.body.email,
            password: hashedPass
        });

        await newUser.save()
        res.redirect('/login')
    }
    catch(ex){
        res.redirect('/registration')
    }
});

module.exports = router;
