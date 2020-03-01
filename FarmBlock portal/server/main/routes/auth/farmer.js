var express = require('express');
var mongo = require('../../databaseConnect/mongoConnect');
var bcrypt = require('bcrypt')
var development = require('../../config/config').development
var secrets = require('../../config/secrets')
var jwt = require('jsonwebtoken')
var path = require('path')

const router = express.Router();

var validatePhone = (phno) =>{
    var re = /[0-9]{10}/;
    return re.test(phno);
}

router.get('/login', (req,res)=>{
    res.sendFile(path.join(__dirname + '/login_farmer.html'))
})

router.post('/login',(req,res)=>{
    try{
        db = mongo.get();
        var e  = new Error()
        const phone = req.body.phone;
        const pass = req.body.pass;
        const col = db.collection(`farmers`);
        console.log(req.body)

        if(phone == null ||pass == null ){
            e.message  = `field required `
            e.code = 401
            throw e
        }

        if(!validatePhone(phone)){
            e.message = `incorrect phone number ${phone}`
            e.code = 401
            throw e
        }

        col.findOne({phone:phone},{projection:{_id:0}}).then((result)=>{
            if(result != null){    

                bcrypt.compare(pass,result.pass).then((match)=>{

                    if(match){

                        const payload = { 
                            user : result.id ,
                            type : 'farmer' 
                        };
                        const options = { expiresIn : '1d', issuer: 'dhaankendra'}
                        const secret = secrets.jwt_secrets 
                        jwt.sign(payload,secret,options).then((token)=>{

                            res.status(200).cookie('token',token,{ 
                                expires: new Date(Date.now() + 86400000),
                                secure: false,
                                httpOnly: true }).json({
                                success:'true',
                                msg : 'successful'
                            })

                        }).catch((err)=>{
                            res.status(301).json({
                            msg : `Error while generating jwt-token .`,
                            success : false
                        })
                        })

                    }else{
                        res.status(301).json({
                            msg : `Passwords doesn't match .`,
                            success : false
                        })
                    }

                }).catch((err)=>{
                    console.log('error : ' + err.message)
                    e.message = `Something went wrong `
                    e.code = 500
                    throw e

                })
            }else{
                e.message = `user ${phone} does not exit `
                e.code = 401
                throw e
            }
        }).catch((e)=>{
            res.status(e.code).json({
                success:false,
                msg : e.message
            })
        })
    }catch(e){
        res.status(e.code).json({
            success:false,
            msg : e.message
        })
    }
})

router.get('/signup', (req,res)=>{
    res.sendFile(path.join(__dirname + '/register_farmer.html'))
})

router.post('/signup',(req,res)=>{
    db = mongo.get();
    const phone = req.body.phone;
    const pass = req.body.pass;
    const col = db.collection(`farmers`);
    var e = new Error();
    try{

        if(phone == null || pass == null){
            e.message = "parameter sent null"
            e.code = 401
        }
        
        if(!validatePhone(phone)){
            e.message = "incorrect phone number"
            e.code = 401
            throw e
        }

        bcrypt.hash(pass,development.saltingRounds).then((hash_pass)=>{

            col.insertOne({id:Math.floor(Math.random()*99745) + 7675,phone:phone , pass:hash_pass}).then((result)=>{
                console.log(result);
                res.status(200).json({
                    success : true,
                    msg : "successful signup"
                })

        }).catch((err)=>{
            console.log(err)
            e.message = 'something went wrong'
            e.code = 500
            throw e
        })

        }).catch((e)=>{
            if(e.code == 11000){
                res.status(301).json({
                    success: false,
                    msg : "Phone already exist"
                })
            }else{
                res.status(500).json({
                    success:false,
                    msg : e.message
                })
            }
            
        })
    }catch(e){
        res.status(e.code).json({
            success: false,
            msg : e.message
        })
    }
    
})


module.exports = router