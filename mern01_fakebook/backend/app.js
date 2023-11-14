require('dotenv').config()
const express = require("express")
const cors = require('cors')
const corsOptions = require('./src/config/corsOptions')
const credentials = require('./src/middleware/credentials')
const verifytoken = require('./src/middleware/verifytoken')

const app = express()

// init body parser middleware - parses json when it goes through
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// handle options credentials check (for cookies) - before CORS
app.use(credentials)

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// turn off authentication for test environment
if(process.env.NODE_ENV !== 'test') {
  app.use(verifytoken) // every route after this line will use verifyjwt - comment this to turn of authorization
}

app.use('/auth', require('./src/routes/authRoutes'))
app.use('/api/users', require('./src/routes/userRoutes'))
app.use('/api/messages', require('./src/routes/messageRoutes'))

module.exports = app