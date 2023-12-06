require('dotenv').config()

// TODO - change to real render static site
const allowedOrigins = [
  process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'https://tennis-static-site.onrender.com'
]

module.exports = allowedOrigins