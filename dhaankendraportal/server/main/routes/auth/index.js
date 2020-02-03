var router = require('express').Router()
var express = require('express')
const mongoClient = require('../../databaseConnect/mongoConnect')

router.use('/farmer',require('./farmer'))
router.use('/buyer',require('./buyer'))

router.get('/logout',(req,res)=>{

    const token = req.cookies.token || ''
    const db = mongoClient.get()
    const ded = db.collection('dedtokens')

    if(token == null){
        res.status(301).json({
            msg : "login first",
            success : false
        })
    }

    ded.insertOne({token:token}).then((res)=>{

        res.clearCookie('token').status(200).json({
            msg : "logged out successfully",
            success : true
        })
        
    }).catch((err)=>{
        console.error(err)
        res.status(302).json({
            success:false,
            msg:"logoout not successful retry again"
        })
    })
});
module.exports = router