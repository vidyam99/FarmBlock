var pass = require('./secrets')

module.exports = {
    development : {
        port: process.env.PORT || 5000 ,
        saltingRounds: 10
    },
    database : {
        DATABASE_URI :  `mongodb+srv://blackcat:${pass.pass}@cluster0-5rkbg.mongodb.net/test?retryWrites=true&w=majority`
    }
}