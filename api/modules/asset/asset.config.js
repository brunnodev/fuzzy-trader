const { normalizeCoinapi } = require('./adapters/coinapi')
const { normalizeYahooFinance } = require('./adapters/yahoo-finance')

const DataSourceTypeEnum = {
  'Stock': 'Stock',
  'Crypto': 'Crypto'
}

const DataSourceMethodEnum = {
  'GET': 'get',
  'POST': 'post'
}

const assetDataSourceList = [
  {
    name: 'yahoo-finance',
    request: {
      url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=',
      headers: {
        'X-RapidAPI-Key': 'b5db1028ddmsh61ae57f0ae42b2fp148c09jsnbc0148faa5f5'
      }
    },
    method: DataSourceMethodEnum.POST,
    type: DataSourceTypeEnum.Stock,
    assetIds: [ 'AMD', 'IBM', 'AAPL', 'FB', 'AMZN', 'TSLA' ],
    assetIdsDivider: ',',
    normalize: normalizeYahooFinance
  },
  {
    name: 'coinapi',
    request: {
      url: 'https://rest.coinapi.io/v1/assets?filter_asset_id='
    },
    method: DataSourceMethodEnum.GET,
    type: DataSourceTypeEnum.Crypto,
    assetIds: [ 'LTC', 'BTC', 'XRP', 'NMC', 'BLC', 'BTS', 'BTX', 'ETH', 'EOS' ],
    assetIdsDivider: ';',
    normalize: normalizeCoinapi
  }
]

/* move it to the database */
const suggestionsConfig = [
  {
    condition: value => (value < 100),
    apply: assets => assets.filter(asset => asset.type === 'Crypto')
  },
  {
    condition: value => (value > 100000),
    apply: assets => assets.filter(asset => ['FB', 'TSLA'].includes(asset.id))
  }
]

module.exports = {
  assetDataSourceList,
  DataSourceTypeEnum,
  suggestionsConfig
}