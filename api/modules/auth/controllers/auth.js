const authService = require('../services/auth')

const { successJsonResponse, errorJsonResponse } =
  require('../../../helpers/response-helper')

exports.login = (req, res) => {
  let loginParams = req.body

  authService.login(loginParams.email, loginParams.password)
    .then(token => successJsonResponse(res, token))
    .catch(error => handleLoginError(res, error))
}

const handleLoginError = (res, errorMessage) => {
  console.log(errorMessage)
  errorJsonResponse(res, errorMessage)
}