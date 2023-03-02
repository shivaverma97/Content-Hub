const express = require('express')

const router = express.Router()

const Contact = require('../model/contact')

router.get('/', async (req, res) => {
    res.render('../views/contactus')
})

router.post('/', async (req, res) => {
    const contact = await new Contact ({
        name : req.body.name,
        email : req.body.email,
        subject : req.body.subject,
        text : req.body.text
    })
    try {
        newContact = await contact.save()
        res.send("Successfully sent the Contact form")
        res.render('../views/contactus')
    } catch(er){
        console.error(er)
    }
})

module.exports = router
