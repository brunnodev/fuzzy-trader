const assetDataSourceService = require('../services/asset-data-source')

const { successJsonResponse, errorJsonResponse } =
  require('../../../helpers/response-helper')

exports.loadAssets = (req, res) => {
  assetDataSourceService.loadAssets()
    .then(assets => successJsonResponse(res, assets))
    .catch(error => handleLoadAssets(res, error))
}

const handleLoadAssets = (res, errorMessage) => {
  errorJsonResponse(res, errorMessage)
}