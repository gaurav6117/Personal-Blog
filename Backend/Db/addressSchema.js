const mongoose = require("mongoose")
const addressSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Address', addressSchema)