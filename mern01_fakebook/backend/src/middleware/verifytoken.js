const admin = require('../config/firebaseConfig')

const verifytoken = async (req, res, next) => {
  if(!req.headers.authorization) return res.status(401).send({message: "Unauthorized"})
  
  const token = req.headers.authorization.split(" ")[1]
  const decodeValue = await admin.auth().verifyIdToken(token)
  if(!decodeValue) {
    return res.status(403).json({ message: 'Forbidden' })
  }
  req.user = decodeValue
  next()
}

module.exports = verifytoken