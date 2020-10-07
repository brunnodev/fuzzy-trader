const request = require('request')

const { assetDataSourceList } = require('../asset.config')

exports.loadAssets = () => {
  const requests = assetDataSourceList.map(assetDataSourceConfig =>
    this.mapAssetRequest(assetDataSourceConfig)
      .then(assetDataSourceConfig.normalize)
  )

  return Promise.all(requests)
    .then(normalizedRequestList => normalizedRequestList.flat())
}

exports.mapAssetRequest = assetDataSourceConfig => {
  return new Promise((resolve, reject) => {
    const handleRequestCallback = (error, response, body) =>
      !!error ? reject(error) : resolve(JSON.parse(body))

    const requestConfig = {
      ...assetDataSourceConfig.request,
      url: mapUrlWithAssets(assetDataSourceConfig)
    }

    return request(requestConfig, handleRequestCallback)
  })
}

const mapUrlWithAssets = assetDataSourceConfig => {
  return assetDataSourceConfig.request.url +
    assetDataSourceConfig.assetIds.join(assetDataSourceConfig.assetIdsDivider)
}