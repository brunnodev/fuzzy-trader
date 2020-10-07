const { generateDataSourceObject } = require('../../../helpers/data-source-helper')

const normalizeYahooFinance = item => {
  return item.quoteResponse.result.map(result =>
    generateDataSourceObject(result.symbol, result.shortName, 'Stock', result.regularMarketPrice)
  )
}

module.exports = {
  normalizeYahooFinance
}