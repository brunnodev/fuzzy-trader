const Sequelize = require('sequelize')

const User = require('../../user/models/user')

const sequelize = require('../../../config/database')

const Investment = sequelize.define('investment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  assetId: Sequelize.STRING,
  amount: Sequelize.STRING,
  purchaseValue: Sequelize.STRING
})

Investment.belongsTo(User)

module.exports = Investment