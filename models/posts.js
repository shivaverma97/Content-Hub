const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    author:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: false,
        deafult: Date.now()

    }
})

module.exports = mongoose.model('Post', postSchema)