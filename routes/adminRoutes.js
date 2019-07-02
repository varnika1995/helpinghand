const router = require('express').Router();
const { celebrate, Joi } = require('celebrate')

const functions = require('../function')
const admin = require('../models/admin')
const NGO = require('../models/NGO')
const doner = require('../models/doner')
const validators = require('../validators/adminValidator')

//register admin

router.post('/register', validators.loginReqValidator
    , (req, res) => {
        try {
            let payLoad = req.body
            admin.findOne({ email: payLoad.email }, (err, data) => {
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

                admin.create(payLoad, (err, data) => {
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

//admin login
router.post('/login', validators.loginReqValidator, (req, res) => {
    try {
       console.log('111111')
        let payLoad = req.body
        admin.findOne({ email: payLoad.email }, (err, data) => {
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




//get doner details


router.get('/getDonerInfo', (req, res) => {
    try {
        console.log('11111111')
        //let payLoad = req.body
        doner.find(req.params, (err, data) => {
            console.log(data)
            if (err) {
                return res.status(200).json({
                    statusCode: 400,
                    message: "somthing is going wrong 1",
                    data: {}
                })
            }

            return res.status(200).json({
                statusCode: 400,
                message: "sucess",
                data: data

            })
        })


    } catch (err) {
        console.error(err)
        res.status(200).json({
            statusCode: 200,
            message: "somthing is going wrong 2",
            data: {}
        })

    }

})




//add ngo

router.post('/addNGO', validators.addngoReqValidator
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

                NGO.create(payLoad, (err, data) => {
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

//delete ngo

router.delete('/deleteNGO', (req, res) => {
    try {
        console.log('11111111')
        //let payLoad = req.body
        NGO.findOne({ email: req.body.email }, (err, data) => {

            console.log(data)
            console.log(err)
            NGO.remove(req.body, (err, data) => {
                console.log(data)
                if (err) {
                    return res.status(200).json({
                        statusCode: 400,
                        message: "somthing is going wrong 1",
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

    } catch (err) {
        console.error(err)
        res.status(200).json({
            statusCode: 200,
            message: "somthing is going wrong 2",
            data: {}
        })

    }

})



module.exports = router;