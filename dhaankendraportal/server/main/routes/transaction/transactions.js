var router = require('express').Router()
var helloContract = require('../../helloContract')

router.get('/',(req,res)=>{
    res.status(200).json({
        success : true,
        msg : "sg"
    })
})

router.get('/status',(req,res)=>{
    var myContract = helloContract.getContract()

    myContract.methods.getStatus().call().then((result)=>{
        res.status(200).json({
            success : true,
            msg : result
        })
    })
})

router.get('/amount',(req,res)=>{
    var myContract = helloContract.getContract()
    myContract.methods.getAmount().call().then((result)=>{
        res.status(200).json({
            success : true,
            msg : result
        })
    })
})

router.get('/paid',(req,res)=>{
    var myContract = helloContract.getContract()
    myContract.methods.getPaid().call().then((result)=>{
        res.status(200).json({
            success : true,
            msg : result
        })
    })
})

router.get('/trans',(req,res)=>{
    var myContract = helloContract.getContract()
    myContract.methods.getTrans().call().then((result)=>{
        res.status(200).json({
            success : true,
            msg : result
        })
    })
})


router.post('/trans',(req,res)=>{
    var myContract = helloContract.getContract()
    myContract.methods.ProductWithtransport(req.body.amount).send({from :account[2]}).then(()=>{
        res.status(200).json({
            success : true,
            msg : "successfull"
        })
    })
})

router.post('/delivered',(req,res)=>{
    var myContract = helloContract.getContract()
    myContract.methods.DeliveredProduct().send({from:account[3]}).then(()=>{
        res.status(200).json({
            success : true,
            msg : "successful"
        })
    })
})

router.post('/accepted',(req,res)=>{
    var myContract = helloContract.getContract()
    myContract.methods.payFarmer().send({from:account[3]}).then(()=>{
        res.status(200).json({
            success : true,
            msg : "successful"
        })
    })
})





router.post('/deploy',(req,res)=>{

    console.log(req.body)
    sender = req.body.sender;
    amount = req.body.amount;
    helloContract.deploy(amount)

    res.status(200).json({
        msg : "succssfull",
        success : true
    })
})

module.exports = router