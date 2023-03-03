// Import required libraries and modules
const express = require('express');
const router = express.Router();
const User = require('../model/user'); // User model

// API route for getting all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API route for getting a single user by ID
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// API route for creating a new user
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// API route for updating an existing user by ID
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// API route for deleting a user by ID
router.delete('/:id', getUser, async (req, res) => {
    let userDelete
    try {
        userDelete = await res.user
        await userDelete.deleteOne()
        res.json({ message: 'User deleted' })
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
});

// Middleware function for getting a single user by ID
async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
    res.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Export the router
module.exports = router
