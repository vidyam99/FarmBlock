const mongo = require('./databaseConnect/mongoConnect');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const PORT = require('./config/config').development.port
var path = require('path')
require('dotenv').config()

const app = express();

app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/static',express.static('public'));
app.use('/images',express.static('images'));

if( process.env.NODE_ENV != 'production'){
    app.use(logger('dev'))
}

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/dashboard.html'))
})

app.use('/',require('./routes'))

app.use((req,res)=>{
    res.status(404).json({
        success:false,
        msg:`page not found`
    })
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);

    // mongo.connect().then((str)=>{
    //     console.log(str);
    // }).catch( (e)=>{
    //     console.error(e);
    // })
})