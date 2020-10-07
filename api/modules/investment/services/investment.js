const Investment = require('../models/investment')

exports.create = investment => {
  return Investment.create(investment)
}

exports.listByUser = userId => {
  return Investment.findAll({
    where: { userId }
  })
}