var express = require('express');
var mongo = require('../../databaseConnect/mongoConnect');
var jwt  = require('jsonwebtoken')
var path = require('path')

const router = express.Router();

var validateEmail= (eAdd) =>{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(eAdd);
}

router.get('/login', (req,res)=>{
    res.sendFile(path.join(__dirname + '/login_buyer.html'))
})

router.post('/login',(req,res)=>{
    try{
        db = mongo.get();
        var e  = new Error()
        const email = req.body.email;
        const pass = req.body.pass;
        const col = db.collection(`buyers`);

        if(email == null ||pass == null ){
            e.message  = `field required `
            e.code = 401
            throw e
        }

        if(!validateEmail(email)){
            e.message = `incorrect email address ${email}`
            e.code = 401
            throw e
        }

        col.findOne({email:email},{projection:{_id:0}}).then((result)=>{
            if(result != null){

                bcrypt.compare(pass,result.pass).then((match)=>{

                    if(match){


                        const payload = {
                            user : result.id,
                            type : 'buyer'
                        }

                        const options = { expiresIn : '1d', issuer: 'dhaankendra'}
                        const secret = secrets.jwt_secrets 
                        jwt.sign(payload,secret,options).then((token)=>{

                            res.status(200).cookie('token',token,{ 
                                expires: new Date(Date.now() + 86400000),
                                secure: false,
                                httpOnly: true }).json({
                                success:'true',
                                msg : 'successful'
                            }).render("../../../client2/register_buyer.html")

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
                e.message = `user ${email} does not exit `
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
    res.sendFile(path.join(__dirname + '/register_buyer.html'))
})


router.post('/signup',(req,res)=>{
    db = mongo.get();
    const email = req.body.email;
    const pass = req.body.pass;
    const col = db.collection(`buyers`);
    var e = new Error();
    try{

        if(email == null || pass == null){
            e.message = "field requires"
            e.code = 401
        }
        
        if(!validateEmail(email)){
            e.message = `incorrect email address ${email}`
            e.code = 401
            throw e
        }
        col.insertOne({id:Math.floor(Math.random()*99745) + 7675,email:email , pass:pass}).then((result)=>{
            console.log(result);
            res.status(200).json({
                success : true,
                msg : "successful signup"
            })

        }).catch((e)=>{
            if(e.code == 11000){
                res.status(301).json({
                    success: false,
                    msg : "email already exist"
                })
            }else{
                res.status(500).json({
                    success:false,
                    msg : 'server internal error'
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