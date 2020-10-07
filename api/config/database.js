const Sequelize = require('sequelize')

const sequelize = new Sequelize('fuzzytrader_db', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost'
})

module.exports = sequelize