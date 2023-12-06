require('dotenv').config()
var admin = require("firebase-admin")

// can be generated Project settings -> Service accounts -> Generate new private key
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_PROJECT_EMAIL,
    privateKey: JSON.parse(process.env.FIREBASE_PRIVATE_KEY).privateKey
  })
})

module.exports = admin