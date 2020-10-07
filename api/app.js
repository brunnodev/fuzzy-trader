
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const sequelize = require('./config/database')

const app = express()

app.use(bodyParser.json({ limit: '5mb' }))
app.use(cors())

sequelize
  .sync()
  .then(() => app.listen(3000))
  .catch(err => console.log(err))