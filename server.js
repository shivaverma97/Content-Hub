const express = require('express')
const app = express()
require('dotenv').config()

const expressLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.set('views', __dirname + '/views')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', ()=> console.log('Database Connected'))



const contactRouter = require('./routes/contact')
app.use('/contactus', contactRouter)

app.listen(process.env.PORT)