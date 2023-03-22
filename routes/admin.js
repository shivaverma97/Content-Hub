const express = require('express')

const router = express.Router()

// To render the Admin Panel Dashboard
router.get('/', (req, res) => {
    res.render('admin/admin')
})

module.exports = router