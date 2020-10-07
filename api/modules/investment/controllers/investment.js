const investmentService = require('../services/investment')

const { successJsonResponse, errorJsonResponse } =
  require('../../../helpers/response-helper')

exports.create = (req, res) => {
  const investmentData = {
    ...req.body,
    userId: req.userId
  }

  investmentService.create(investmentData)
    .then(investment => successJsonResponse(res, investment))
    .catch(error => handleCreateInvestment(res, error))
}

const handleCreateInvestment = (res, errorMessage) => {
  errorJsonResponse(res, errorMessage)
}

exports.list = (req, res) => {
  const userId = req.userId

  investmentService.listByUser(userId)
    .then(investments => successJsonResponse(res, investments))
    .catch(error => handleListInvestment(res, error))
}

const handleListInvestment = (res, errorMessage) => {
  errorJsonResponse(res, errorMessage)
}