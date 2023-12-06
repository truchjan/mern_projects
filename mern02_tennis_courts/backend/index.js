require('dotenv').config()
const app = require('./app')
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_CONNECTION_STRING)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))