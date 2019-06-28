const mongoose = require('mongoose')
const Schema = mongoose.Schema


let DonationSchema = new Schema({
    donerId: String,
    donerName: String,
    ngoId: String,
    ngoName: String,
    email: String,
    amount: String,
    reference: String,
    createdAt: { type: Date, default: Date.now() }

})

module.exports = mongoose.model('donation', DonationSchema);