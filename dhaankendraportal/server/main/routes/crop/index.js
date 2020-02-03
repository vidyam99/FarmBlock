const router = require('express').Router()
const mongo = require('../../databaseConnect/mongoConnect')


router.get('/all',(req,res)=>{

    const db = mongo.get()
    const crops = db.collection('cropdetails')
    var e = new Error()

    crops.find({}).toArray((err,data)=>{
        if(err){
            throw new Error(err)
        }else{
            console.log(data)
            res.status(200).json(data)
        }
    })

    // crops.find({}).then((cursor)=>{
    //     cursor.toArray((err,data)=>{
    //         if(err){
    //             throw new Error(err)
    //         }else{
    //             console.log(data)
    //             res.status(200).json(data)
    //         }
    //     })
    // }).catch((err)=>{
    //     console.error(err)
    //     res.status(401).json({
    //         success:false,
    //         msg:"failed"
    //     })
    // })

})

module.exports = router