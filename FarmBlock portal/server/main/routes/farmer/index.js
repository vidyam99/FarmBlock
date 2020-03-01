var router  = require('express').Router()

router.get('/',(req,res)=>{
    res.status(200).json({
        msg:'success',
        success:true
    })
})

router.use('/',require('./info'))

module.exports = router