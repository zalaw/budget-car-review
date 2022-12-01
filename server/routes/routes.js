const express = require('express')
const router = express.Router()

router.use('/auth', require('./auth/auth.js'))
router.use('/api', require('./api/api.js'))

module.exports = router