const mongoose=require('mongoose')
const Schema=mongoose.Schema

let DonerSchema=new Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    //birthDate:String,
    contact:String,
    salt:String,
    createdAt:{type:Date, default:Date.now()}
})


module.exports=mongoose.model('doner',DonerSchema)