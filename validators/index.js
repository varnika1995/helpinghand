//const router=require('express').Router()

const userValidator=require('./userValidator')
const adminValidator=require('./adminValidator')

//router.use('/user',userValidator)

module.exports={userValidator,adminValidator}