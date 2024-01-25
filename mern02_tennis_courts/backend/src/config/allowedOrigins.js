require('dotenv').config()

const allowedOrigins = [
  process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'https://tennis-courts.onrender.com'
]

module.exports = allowedOrigins