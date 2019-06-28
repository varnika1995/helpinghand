const router = require('express').Router();
const { celebrate, Joi } = require('celebrate')

const validators = require('../validators/userValidator')
const functions = require('../function');
const doner = require('../models/doner');
const NGO = require('../models/NGO');
//sconst donation=require('../donation')

//doner registration 



router.post('/register', validators.registerReqValidator
    , (req, res) => {
        try {
            let payLoad = req.body
            doner.findOne({ email: payLoad.email }, (err, data) => {
                if (err) {
                    return res.status(200).json({
                        statusCode: 400,
                        message: "somthing is going wrong",
                        data: {}
                    })
                }
                if (data) {
                    return res.status(200).json({
                        statusCode: 401,
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
                            statusCode: 402,
                            message: "user not found",
                            data: {}
                        })

                    }

                    return res.status(200).json({
                        statusCode: 200,
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

router.post('/login', validators.loginReqValidator, (req, res) => {
    try {
        console.log('11111111')
        let payLoad = req.body
        doner.findOne({ email: payLoad.email }, (err, data) => {
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
                    statusCode: 401,
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


//add money

router.post('/addMoney', (req, res) => {
    try{
        console.log('111111')
        let payLoad=req.body
        doner.findOne({ donerId: payLoad.id }, (err, data) => {
            console.log(data)
            if (err) {
                return res.status(200).json({
                    statusCode: 400,
                    message: "somthing went wrong",
                    data: {}
                })
            }
            if (!data) {
                return res.status(200).json({
                    statusCode: 400,
                    message: "doner not exist",
                    data: {}
                })
            }

            NGO.findOne({ngoId:payLoad.id},(err,data)=>{
                console.log(data)
                if(err)
                {
                    return res.status(200).json({
                        statusCode: 400,
                        message: "somthing went wrong",
                        data: {}
                    })                
    
                }
                id(!data)
                {
                    return res.status(200).json({
                        statusCode: 400,
                        message: "ngo not exist",
                        data: {}
                    })
                    
                }
            })
        })
      


    }catch(err)
    {
        res.status(200).json({
            statusCode: 400,
            message: "somthing went wrong",
            data: {}
        })

    }
})
    
module.exports = router