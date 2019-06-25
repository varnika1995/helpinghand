const express = require('express');
const morgan = require('morgan')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
//const errorhandler=require('errorhandler')
const { celebrate, Joi, errors } = require('celebrate')

const config = require('./config')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//app.use(errorhandler())

const doner = require('./models/doner');
const NGO = require('./models/NGO');
const admin = require('./models/admin')

const URI = "mongodb://localhost:27017/HelpingHands"

mongoose.connect(URI, { useNewUrlParser: true })

    .then(() => {
        console.log('db connect sucessfull ')

    }).catch((error) => {
        console.log('errors', error)
        process.exit(1)

    })

//doner registration 

app.post('/Dregister', celebrate({
    body: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        contact: Joi.string().required()
    })
}), (req, res) => {
    try {
        let playLoad = req.body
        doner.findOne({ email: playLoad.email }, (err, data) => {
            if (err) {
                return res.status(200).json({
                    statusCode: 400,
                    message: "somthing is going wrong",
                    data: {}
                })
            }
            if (!data) {
                return res.status(200).json({
                    statusCode: 400,
                    message: "user not found",
                    data: {}
                })

            }

            doner.create(playLoad, (err, data) => {
                if (err) {
                    return res.status(200).json({
                        statusCode: 400,
                        message: "somthing is going wrong",
                        data: {}
                    })
                }
                return res.status(200).json({
                    statusCode: 400,
                    message: "sucess",
                    data: data

                })
            })

        })
    }
    catch (err) {
        console.error(err)
        res.status(200).json({
            statusCode: 400,
            message: "somthing is going wrong",
            data: {}
        })


    }

})


//doner login

app.post('/Dlogin', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
}), (req, res) => {
    try {
        let playLoad = req.body
        doner.findOne({ email: playLoad.email }, (err, data) => {
            if (data === null) {
                return res.status(200).json({
                    statusCode: 400,
                    message: "invalid login",
                    data: {}
                })
            }
            else if (data.email === playLoad.email && data.password === playLoad.password) {
                return res.status(200).json({
                    statusCode: 400,
                    message: " login sucess",
                    data: data
                })
            }
            else {

                console.log("Credentials wrong");
                return res.contentType('json').json({
                    statusCode: 500,
                    message: "login invalid"
                })
            }


        })
    }
    catch (err) {
        console.error(err)
        res.status(200).json({
            statusCode: 400,
            message: "somthing is going wrong",
            data: {}
        })


    }

})

//NGO registration

app.post('/Nregister', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        address: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        contact: Joi.string().required()
    })
}), (req, res) => {
    try {
        let playLoad = req.body
        NGO.findOne({ email: playLoad.email }, (err, data) => {
            if (err) {
                return res.status(200).json({
                    statusCode: 400,
                    message: "somthing is going wrong",
                    data: {}
                })
            }
            if (!data) {
                return res.status(200).json({
                    statusCode: 400,
                    message: "user not found",
                    data: {}
                })

            }

            NGO.create(playLoad, (err, data) => {
                if (err) {
                    return res.status(200).json({
                        statusCode: 400,
                        message: "somthing is going wrong",
                        data: {}
                    })
                }
                return res.status(200).json({
                    statusCode: 400,
                    message: "sucess",
                    data: data

                })
            })

        })
    }
    catch (err) {
        console.error(err)
        res.status(200).json({
            statusCode: 400,
            message: "somthing is going wrong",
            data: {}
        })


    }

})

//NGO login

app.post('/Nlogin', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
}), (req, res) => {
    try {
        let playLoad = req.body
        NGO.findOne({ email: playLoad.email }, (err, data) => {
            if (data === null) {
                return res.status(200).json({
                    statusCode: 400,
                    message: "invalid login",
                    data: {}
                })
            }
            else if (data.email === playLoad.email && data.password === playLoad.password) {
                return res.status(200).json({
                    statusCode: 400,
                    message: " login sucess",
                    data: data
                })
            }
            else {

                console.log("Credentials wrong");
                return res.contentType('json').json({
                    statusCode: 500,
                    message: "login invalid"
                })
            }


        })
    }
    catch (err) {
        console.error(err)
        res.status(200).json({
            statusCode: 400,
            message: "somthing is going wrong",
            data: {}
        })


    }

})

//admin login
app.post('/adminLogin', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
}), (req, res) => {
    try {
        let playLoad = req.body

        admin.findOne({ email: playLoad.email }, (err, data) => {

            if (data === null) {
                return res.status(200).json({
                    statusCode: 400,
                    message: "invalid login",
                    data: {}
                })
            }
            else if (data.email === playLoad.email && data.password === playLoad.password) {
                return res.status(200).json({
                    statusCode: 400,
                    message: " login sucess",
                    data: data
                })
            }
            else {

                console.log("Credentials wrong");
                return res.contentType('json').json({
                    statusCode: 500,
                    message: "login invalid"
                })
            }


        })
    }
    catch (err) {
        console.error(err)
        res.status(200).json({
            statusCode: 400,
            message: "somthing is going wrong",
            data: {}
        })


    }

})

app.use(errors())

app.use((req, res, next) => {
    next('no router found')
})

app.use((err, req, res, next) => {

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {}
})


app.listen(7000, () => {
    console.log('server start @7000')
})