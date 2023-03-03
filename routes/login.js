const express = require('express');
const passport = require('passport');
const router = express.Router();
const {checkAuthenticated, checkNotAuthenticated} = require('../userAuth')

// Render login form
router.get('/', checkNotAuthenticated, (req, res) => {
  res.render('login');
});

// Handle login form submission
router.post('/', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}));

module.exports = router;
