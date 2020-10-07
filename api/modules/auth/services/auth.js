const jwt = require('jsonwebtoken')

const JwtConfig = require('../../../config/jwt')
const User = require('../../user/models/user')

exports.login = (email, password) => {
  const query = {
    where: {
      email: email
    }
  }

  return User.findOne(query)
    .then(user => this.validateLogin(user, password))
    .then(this.mapUserToken)
}

exports.validateLogin = (user, password) => {
  const invalidPassword = !user || user.password !== password

  if (invalidPassword) {
    throw 'Invalid login and or password'
  }

  return user
}

// improve it
exports.mapUserToken = user => {
  const SECRET_KEY = JwtConfig.secretKey
  const TOKEN_VALIDATION_TIME = JwtConfig.tokenTime

  const token = jwt.sign(user.dataValues, SECRET_KEY, {
    expiresIn: TOKEN_VALIDATION_TIME
  })

  return {
    user,
    token
  }
}