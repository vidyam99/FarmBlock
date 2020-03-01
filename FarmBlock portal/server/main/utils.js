var redis = require('redis');
var JWTR =  require('jwt-redis').default;
var redisClient = redis.createClient();
var jwt = new JWTR(redisClient);
const jwtSecrets = require('./config/secrets').jwt_secrets
const mongoClient = require('./databaseConnect/mongoConnect')

module.exports = {

    validateToken : (req,res,next) => {

        const token = req.cookies.token || ''
        const db = mongoClient.get()
        const ded = db.collection('dedtokens')

        if(token){
            const options = {
                issuer: 'dhaankendra'
            };

            jwt.verify(token,jwtSecrets,options).then((decoded)=>{

                ded.findOne({token:token},{projection:{_id:0}}).then((result)=>{

                    if(result == null){

                        console.log(`User authenticated`)
                        req.decoded = decoded;
                        next()
                    }else{
                        
                        res.status(401).json({
                            msg: `Token Expired or illegal token.`,
                            success : false
                        })
                    }
                })

            }).catch((err)=>{

                console.log(err)
                res.status(401).json({
                    msg: `Token Expired or illegal token.`,
                    success : false
                })
            });
            
        }else{
            res.status(401).json({
                msg: `Authentication error . Token required.`,
                success : false
            })
        }
    },

    validateTransactions : ( req, res , next) => {

        const tid = req.cookies.tid || ""

        if(tid == ""){
            res.status(302).json({
                success : false,
                msg : 'no tid assigned cannot participate'
            })
        }

        req.tid = tid 
        next()

    }

}
