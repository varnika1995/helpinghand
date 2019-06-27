const router = require('express').Router();
const { celebrate, Joi } = require('celebrate')

//const validators = require('../validators/userValidator')
const functions = require('../function');
const NGO = require('../models/NGO');

//NGO registration 

router.post('/register'    
  , (req, res) => {
        try {
            let payLoad = req.body
            NGO.findOne({ email: payLoad.email }, (err, data) => {
                if (err) {
                    return res.status(200).json({
                        statusCode: 400,
                        message: "somthing is going wrong",
                        data: {}
                    })
                }
                if (data) {
                    return res.status(200).json({
                        statusCode: 400,
                        message: "user  already exist",
                        data: {}
                    })

                }

                let hashObj = functions.hashPassword(payLoad.password)
                console.log(hashObj)
                delete payLoad.password

                payLoad.salt = hashObj.salt
                payLoad.password = hashObj.hash

                doner.create(payLoad, (err, data) => {
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

router.post('/login', (req, res) => {
    try {
        
        let payLoad = req.body
        NGO.findOne({ email: payLoad.email }, (err, data) => {
            console.log(data)
            if (err) {
                console.error(err)
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

            let isPassValid = functions.validatePassword(data.salt, payLoad.password, data.password)

            if (!isPassValid) {
                return res.status(200).json({
                    statusCode: 400,
                    message: "invalid email id and password",
                    data: {}

                })
            }
            return res.status(200).json({
                statusCode: 200,
                message: "sucess",
                data: data
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





module.exports = router