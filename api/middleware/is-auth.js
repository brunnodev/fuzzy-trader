const jwt = require('jsonwebtoken')
const HttpStatus = require('http-status-codes')

const JwtConfig = require('../config/jwt')

module.exports = (req, res, next) => {
  const token = req.get('Authorization')
  const decodedToken = decodeToken(token)

  if (!decodedToken) {
    res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'NOT_AUTHENTICATED' })

    return
  }

  req.userId = decodedToken.id

  next()
}

const decodeToken = token => {
  let decodedToken

  try {
    decodedToken = jwt.verify(token, JwtConfig.secretKey)
  } catch (error) {
    error.statusCode = HttpStatus.UNAUTHORIZED
    throw error
  }

  return decodedToken
}