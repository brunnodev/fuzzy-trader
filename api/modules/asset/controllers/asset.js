const assetDataSourceService = require('../services/asset-data-source')

const { successJsonResponse, errorJsonResponse } =
  require('../../../helpers/response-helper')

exports.loadAssets = (req, res) => {
  const valueToInvest = req.query.valueToInvest

  assetDataSourceService.loadAssets(valueToInvest)
    .then(assets => successJsonResponse(res, assets))
    .catch(error => handleLoadAssets(res, error))
}

const handleLoadAssets = (res, errorMessage) => {
  errorJsonResponse(res, errorMessage)
}