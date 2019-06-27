const router=require('express').Router()

const userRouter=require('./userRoutes')
const ngoRouter=require('./ngoRoutes')
const adminRouter=require('./adminRoutes')

router.use('/user',userRouter)
router.use('/ngo',ngoRouter)
router.use('/admin',adminRouter)

module.exports=router