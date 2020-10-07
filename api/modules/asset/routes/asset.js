const express = require('express')

const assetCtrl = require('../controllers/asset')

const isAuth = require('../../../middleware/is-auth')

const router = express.Router()

//GET /asset
router.get('/', isAuth, assetCtrl.loadAssets)

module.exports = router