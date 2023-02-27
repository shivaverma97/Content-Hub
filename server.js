const express = require('express')
const app = express()
require('dotenv').config()

app.listen( process.env.PORT||3000)