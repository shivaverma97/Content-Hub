// Import required libraries and modules
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // User model
const bcrypt = require('bcrypt')

router.get('/', async (req, res) =>{
  res.render('admin/adminUserMgmt')
})
// API route for getting all users
router.get('/viewUser', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API route for getting a single user by ID
router.get('/viewUser/:id', getUser, (req, res) => {
  res.json(res.user);
});

// API route for creating a new user
router.get('/addUser', async (req,res) => {
  res.render('admin/addUser')
})

router.post('/addUser', async (req, res) => {
  const hashedPass = await bcrypt.hash(req.body.password,10)
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPass,
  });
  try {
    await user.save();
    console.info("Successfully added a User")
    res.status(201).redirect('admin/admin');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// API route for updating an existing user by ID
router.get('/updateUser', async(req, res) => {
  res.render('admin/updateUser')
})

router.patch('/updateUser/:id', getUser, async (req, res) => {
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
    await res.user.save();
    res.json({message:"The entry has been updated"})
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// API route for deleting a user by ID
router.get('/deleteUser', async(req, res) => {
  res.render('admin/deleteUser')
})
router.delete('/deleteUser/:id', getUser, async (req, res) => {
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
