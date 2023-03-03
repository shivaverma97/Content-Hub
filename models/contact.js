const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    date: {
        type : Date,
        required : false,
        default : Date.now()
    },
    text: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Contact', contactSchema)