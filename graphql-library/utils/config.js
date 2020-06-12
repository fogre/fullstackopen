require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  SECRET
}