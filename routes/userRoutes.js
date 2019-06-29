const router = require('express').Router();
const { celebrate, Joi } = require('celebrate')

const validators = require('../validators/userValidator')
const functions = require('../function');
const doner = require('../models/doner');
const Donation = require('../models/donation');
const NGO = require('../models/NGO');
const mongoose = require('mongoose');

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

router.post('/addMoney', async (req, res) => {
    try {
        let payload = req.body
        let donarData = await doner.findOne({ _id: mongoose.Types.ObjectId(payload.donerId) });

        if (!donarData) {
            return res.status(200).json({
                statusCode: 400,
                message: "doner not exist",
                data: {}
            })
        }

        let ngoData = await NGO.findOne({ _id: mongoose.Types.ObjectId(payload.ngoId) });
        console.log(ngoData)

        if (!ngoData) {
            return res.status(200).json({
                statusCode: 400,
                message: "ngo not exist",
                data: {}
            })

        }
        let donationData = await Donation.create(payload);
        if (!donationData) {
            return res.status(200).json({
                statusCode: 400,
                message: "somthing went wrong1",
                data: {}
            });
        }

        let updatedData = await NGO.updateOne({ _id: mongoose.Types.ObjectId(payload.ngoId) },
            {
                $set: {balance: parseInt(ngoData.balance) + parseInt(payload.amount) }
            },
            { new: true });

        if (!updatedData) {
            return res.status(200).json({
                statusCode: 400,
                message: "somthing went wrong2",
                data: {}
            })
        }

        return res.status(200).json({
            statusCode: 200,
            message: "sucess",
            data: donationData
        })

    } catch (err) {
        res.status(200).json({
            statusCode: 400,
            message: "somthing went wrong3",
            data: {}
        })

    }
})

module.exports = router