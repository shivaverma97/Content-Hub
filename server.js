const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const expressLayout = require('express-ejs-layouts')
const User = require('./models/user')
const flash = require('express-flash')
const bcrypt = require('bcrypt')
const app = express();
const methodOverride = require('method-override')
require('dotenv').config()

// Set up body parser and session middleware

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layout')
app.use(expressLayout)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Connect to database
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Initialize passport and session middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure local strategy for passport authentication
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email }, async (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Incorrect email' }); }
    if (!await bcrypt.compare(password, user.password)) { return done(null, false, { message: 'Incorrect password' }); }
    return done(null, user);
  });
}));

// Serialize and deserialize user for session storage
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

// Import and use login and registration routes
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const homeRoutes = require('./routes/home');
const logoutRoutes = require('./routes/logout')
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/home', homeRoutes);
app.use('/logout', logoutRoutes);

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
