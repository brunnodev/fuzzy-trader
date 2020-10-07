const express = require('express')

const investmentCtrl = require('../controllers/investment')

const isAuth = require('../../../middleware/is-auth')

const router = express.Router()

//POST /investment
router.post('/', isAuth, investmentCtrl.create)

//GET /investment
router.get('/', isAuth, investmentCtrl.list)

module.exports = router