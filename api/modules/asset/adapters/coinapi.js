const { generateDataSourceObject } = require('../../../helpers/data-source-helper')

const normalizeCoinapi = assetList => {
  return assetList.map(asset =>
    generateDataSourceObject(asset.asset_id, asset.name, 'Crypto', asset.price_usd)
  )
}

module.exports = {
  normalizeCoinapi
}