const mongoose = require("mongoose")
var moment = require('moment');
const placedorderSchema = new mongoose.Schema({
    created_at: {
        type: String,
        default: (moment().format('MMMM Do YYYY, h:mm:ss a')),
    },
    products: {
        type: Array,
        required: true
    },
    user_id: {
        type:String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },   
    active_flag:{
        type: Boolean,
        default: true
    }
})
module.exports = mongoose.model('placedOrder', placedorderSchema)