const {celebrate,Joi}=require('celebrate')


const loginReqValidator=celebrate({
    body:Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
})

const addngoReqValidator= celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        address: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        contact: Joi.string().required(),
        balance: Joi.string().required()
    })
})

module.exports={
    loginReqValidator,addngoReqValidator
}