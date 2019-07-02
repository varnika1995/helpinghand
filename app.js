const express = require('express')
const morgan = require('morgan')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const assert = require('assert')
const cors=require('cors')
const path=require('path')
//const expressOasGenerator = require('express-oas-generator');

const bodyParser = require('body-parser')
const { errors } = require('celebrate')

const config = require('./config')
const routes = require('./routes')

const app = express()

//expressOasGenerator.init(app, {});

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/sigup.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'signup.html'))
})

app.get('/sigin.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'signin.html'))
})


const URI = "mongodb://localhost:27017/HelpingHands"


mongoose.connect(URI, { useNewUrlParser: true })

    .then(() => {
        console.log('db connect sucessfull ')

    }).catch((error) => {
        console.log('errors', error)
        process.exit(1)

    })

app.use('/api', routes)


app.use(errors())

app.use((req, res, next) => {
    res.status(404).json({
        statusCode: 400,
        message: "not found"
        //  data:data
    })
    // next('no router found')
})




app.listen(7000, () => {
    console.log('server start @7000')
})