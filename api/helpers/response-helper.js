var HttpStatus = require('http-status-codes')

//Review this names

const successJsonResponse = (res, data, status = HttpStatus.OK) => {
  return res.status(status).json(data)
}

const errorJsonResponse = (res, message = 'DEFAULT_SERVER_ERROR', status = HttpStatus.INTERNAL_SERVER_ERROR) => {
  return res.status(status).json({ message })
}

module.exports = {
  successJsonResponse,
  errorJsonResponse
}