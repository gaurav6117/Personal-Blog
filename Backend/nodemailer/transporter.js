const express= require("express");
const router= express.Router();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'singh.gaurav9770@gmail.com',
        pass: 'Gsc@1234$9770'
    },
    secure:true
    });
module.exports=transporter;