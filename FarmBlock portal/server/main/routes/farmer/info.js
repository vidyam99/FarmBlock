const router = require('express').Router()
var mongo = require('../../databaseConnect/mongoConnect');


router.post('/update',(req,res)=>{
    const db = mongo.get()
    const farmers = db.collection('farmers')
    var e = new Error()

    const payload  = req.decoded 

    if(payload && payload.type == 'farmer'){

        name = req.body.name
        surname  = req.body.surname
        email = req.body.email 
        address = req.body.address
        age = req.body.age
        gender = req.body.gender

        farmers.updateOne({id:payload.user},{$set:{name:name,surname:surname,email:email,address:address,age:age,gender:gender}},(err,data)=>{
            if(err){
                res.status(500).json({
                    msg: err.message,
                    success: false
                })
            }else{
                farmers.findOne({id:payload.user},{projection:{_id:0,pass:0}},(err,data)=>{
                    if(err){
                        res.status(500).json({
                            msg: err.message,
                            success: false
                        })
                    }else{
                        res.status(200).json({
                            result :data,
                            success: true,
                            msg: "success"
                        })
                    }
                })
            }
        })
    }

})

router.get('/info',(req,res)=>{
    const db = mongo.get()
    const farmers = db.collection('farmers')
    var e = new Error()

    const payload = req.decoded

    if(payload && payload.type == `farmer`){

        farmers.findOne({id:payload.user},{projection:{_id:0,pass:0}},(err,data)=>{
            if(err){
                res.status(500).json({
                    msg: err.message,
                    success: false
                })
            }else{
                console.log(data)
                res.status(200).json({
                    result :data,
                    success: true,
                    msg: "success"
                })
            }
        })
    }
})

router.post("/addcrop",(req,res)=>{
    const db = mongo.get()
    const crops = db.collection('cropdetails')
    const farmers = db.collection('farmers')
    var e  = new Error()
    const payload = req.payload
    
    try{

        const cropName = req.body.crop
        const cropWt = req.body.amount
        const cropPrice = req.body.price

        if(cropName == null || cropWt == null){
            e.message = "parameter required"
            e.code = 401
            throw e 
        }
        
        if(payload && payload.type == 'farmer'){

            farmers.findOne({id:payload.user},{projection:{_id:0,pass:0}}).then((result)=>{

                if(result == null){
                    res.status(301).json({
                        success:false,
                        msg:"user doesn't exist"
                    })
                }else{
                    crops.insertOne({id:Math.floor(Math.random()*98542) + 8970 , farmer:result.id , fname: result.name , fname2: result.surname , cropName:cropName , cropWt : cropWt , cropPrice: cropPrice}).then((ack)=>{
                        res.status(200).json({
                            success:true,
                            msg:"successfully inserted crop data"
                        })
                    }).catch((err)=>{
                        console.log(err)
                        e.message = 'something went wrong'
                        e.code = 500
                        throw e
                    })
                }

            }).catch((err)=>{
                res.status(301).json({
                    success:false,
                    msg:"error occured"
                })
            })
        }else{
            e.message = "login first"
            e.code = 402
            throw e
        }

    }catch(e){

    }
})

router.post('/updatecrop/:id',(req,res)=>{
    const db = mongo.get()
    const crops = db.collection('cropdetails')
    const id = req.params.id
    var e  = new Error()
    const payload = req.payload
    
    try{

        const cropName = req.body.crop
        const cropWt = req.body.amount
        const cropPrice = req.body.price
        
        if(payload && payload.type == 'farmer'){

            crops.findOne({id:id,farmer:payload.user},{projection:{_id:0}}).then((result)=>{

                if(result == null){
                    res.status(301).json({
                        success:false,
                        msg:"no such crops in this user"
                    })
                }else{
                    crops.updateOne({id:id},{ $set : { cropName:cropName || result.cropName , cropWt : cropWt || result.cropWt , cropPrice: cropPrice || result.cropPrice}}).then((ack)=>{
                        res.status(200).json({
                            success:true,
                            msg:"successfully inserted crop data"
                        })
                    }).catch((err)=>{
                        console.log(err)
                        e.message = 'something went wrong'
                        e.code = 500
                        throw e
                    })
                }

            }).catch((err)=>{
                res.status(301).json({
                    success:false,
                    msg:"error occured"
                })
            })
        }else{
            e.message = "login first"
            e.code = 402
            throw e
        }

    }catch(e){

    }
})

module.exports = router