const Sequelize = require('sequelize')

const sequelize = new Sequelize('fuzzytrader_db', 'root', 'fuzzytrader@123', {
  dialect: 'mysql',
  host: '35.198.52.153'
})

module.exports = sequelize