var web3 = require('web3')
var compiler = require('solc')
var fs = require('fs')

sourceCode = fs.readFileSync('Hello.sol').toString()
compileCode = compiler.compile(sourceCode)
helloInterface = JSON.parse(compileCode.contracts[':Farmblock'].interface)
helloByteCode = compileCode.contracts[':Farmblock'].bytecode;

ethereumJS = require('web3')
web3 = new ethereumJS('http://localhost:8545')
helloContract = new web3.eth.Contract(helloInterface)
web3.eth.getAccounts().then((res)=>{
    account = res  
})

myContract = null

module.exports = {

    accountDetails : ()=>{
        return account
    },

    deploy : (amount)=>{
        console.log(amount)
        helloContract.deploy({
            data : helloByteCode,
            arguments: [amount,0,0]
        }).send({
            from : account[0],
            gas:4500000
        }).then((res)=>{
            myContract = res
            return myContract
        })
    },

    getContract : ()=>{
        return myContract
    }
}






