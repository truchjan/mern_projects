require('dotenv').config()

// TODO - change to created render static site
const allowedOrigins = [
  process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'https://firebase-messageboard.onrender.com'
]

module.exports = allowedOrigins