const express = require('express')

const router = express.Router()

const Contact = require('../models/contact')

router.get('/', async (req, res) => {
    res.render('../views/contactus')
})

router.post('/', async (req, res) => {
    const contact = new Contact ({
        name : req.body.name,
        email : req.body.email,
        subject : req.body.subject,
        text : req.body.text
    })
    try{
    res.status(201).json(contact)
    }  catch (err) {
    res.status(400).json({ message: err.message })
    }
})
module.exports = router
