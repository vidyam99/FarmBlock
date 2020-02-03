var router  = require('express').Router()
const validateToken = require('../utils').validateToken
const validateTransactions = require('../utils').validateTransactions

router.use('/auth',require('./auth'))
router.use('/farmer',validateToken,require('./farmer'))
router.use('/crop',require('./crop'))
router.use('/transaction',require('./transaction'))
router.use('/buyer',validateToken,require('./buyer'))


module.exports = router