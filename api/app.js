
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const sequelize = require('./config/database')

const authRoutes = require('./modules/auth/routes/auth')

const app = express()

app.use(bodyParser.json({ limit: '5mb' }))
app.use(cors())

app.use('/auth', authRoutes)

sequelize
  .sync()
  .then(() => app.listen(3000))
  .catch(err => console.log(err))