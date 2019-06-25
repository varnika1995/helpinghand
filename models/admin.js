const mongoose=require('mongoose')
const Schema=mongoose.Schema

let adminSchema=new Schema({

    email:String,
    password:String,
    createdAt:{type:Date, default:Date.now()}
})


module.exports=mongoose.model('admin',adminSchema)