const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    profile_image: {
        type: Array,
        required: true
    },
    date: { type: Date, default: Date.now }
})
module.exports = mongoose.model("userData", loginSchema)