const mongoose = require('mongoose')
const Schema = mongoose.Schema

let NGOSchema = new Schema({
    name: String,
    address: String,
    email: String,
    password: String,
    contact: String,
    balance: Number,
    salt: String,
    createdAt: { type: Date, default: Date.now() }
})


module.exports = mongoose.model('NGO', NGOSchema)