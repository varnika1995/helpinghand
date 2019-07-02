const mongoose=require('mongoose')
const Schema=mongoose.Schema

let fundSchema=new Schema({
    yourStory:String,
    fundGoal:String,
    fundtitle:String,
    
    createdAt:{type:Date, default:Date.now()}
})


module.exports=mongoose.model('fund',fundSchema)