
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const sequelize = require('./config/database')

const authRoutes = require('./modules/auth/routes/auth')
const assetRoutes = require('./modules/asset/routes/asset')
const investmentRoutes = require('./modules/investment/routes/investment')

const app = express()

app.use(bodyParser.json({ limit: '5mb' }))
app.use(cors())

app.use('/auth', authRoutes)
app.use('/asset', assetRoutes)
app.use('/investment', investmentRoutes)

sequelize
  .sync()
  .then(() => app.listen(3000))
  .catch(err => console.log(err))