const express = require('express')

const authCtrl = require('../controllers/auth')

const router = express.Router()

// Add params validation
// Add authentiction token

//POST /auth/login
router.post('/login', authCtrl.login)

module.exports = router