const request = require('request')

const { assetDataSourceList, suggestionsConfig } = require('../asset.config')

exports.loadAssets = investedValue => {
  const requests = assetDataSourceList.map(assetDataSourceConfig =>
    this.mapAssetRequest(assetDataSourceConfig)
      .then(assetDataSourceConfig.normalize)
  )

  return Promise.all(requests)
    .then(normalizedRequestList => normalizedRequestList.flat())
    .then(assets => this.mapSuggestions(investedValue, assets))
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

//Improvement needed :(
exports.mapSuggestions = (investedValue, assets) => {
  let suggestions = [ ...assets ]

  const suggestionsToApply = mapSuggestionByInvestedValue(investedValue)

  suggestionsToApply.forEach(toApply => {
    suggestions = [ ...toApply.apply(suggestions)  ]
  })

  return {
    assets,
    suggestions
  }
}

const mapSuggestionByInvestedValue = (investedValue) => {
  return suggestionsConfig.filter(suggestionConfig =>
    suggestionConfig.condition(investedValue)
  )
}