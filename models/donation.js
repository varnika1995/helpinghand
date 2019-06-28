const mongoose=require('mongoose')
const Schema=mongoose.Schema


let MoneySchema=new Schema({

   /* donerId:String,
    donerName:String,
    ngoId:String,
    ngoName:String,
    balance:String,*/
    id:String,
    email:String,
    amount:String,
    reference:String,
    createdAt:{type:Date,default:Date.now()}
    
})

module.exports=MoneySchema