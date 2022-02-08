const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const jwtSecret = "asdasd324234#@$dgdfg";
const router = express.Router();
const loginModel = require("../Db/loginSchema")
const { body, validationResult } = require('express-validator');
const { logindata} = require("../controller/loginController")
const transporter = require("../nodemailer/transporter")
var otp = Math.random()
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

router.post("/getUser", (req, res) => {
    loginModel.findOne({ email: req.body.email }, (err, data) => {
        if (err) throw err;
        if (data) {
            if (bcrypt.compareSync(req.body.password, data.password)) {
                let payload = {
                    uid: data
                }
                res.json({
                    "success": true,
                    "status_code": 200,
                    "message": "You have logged In",
                    "customer_details": data,
                    "token": jwt.sign(payload, jwtSecret, { expiresIn: 10800000 })
                })
            }
            else{
                res.json({
                    "success": false,
                    "status_code": 400,
                    "message": "Invalid Credentials",
                })
            }
        }
        else{
            res.json({
                "success": false,
                "status_code": 400,
                "message": "Invalid Credentials",
            })
        }
    })
})
router.post("/addUser",
    body('email').isEmail(),
    body('first_name').isLength({ min: 3 }),
    body('last_name').isLength({ min: 3 }),
    body('mobile').isLength({ min: 10, max: 10 }).isInt(),
    body('password').isLength({ min: 8 }),
    body("date_of_birth").isDate(),
    (req, res) => {
        const saltRounds = 10;
        const myPlaintextPassword = req.body.password;
        const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        logindata({ first_name: req.body.first_name, gender: req.body.gender, last_name: req.body.last_name, password: hash, email: req.body.email, mobile: req.body.mobile, date_of_birth: req.body.date_of_birth, profile_image: req.body.profile_image })
        res.json({
            "success": true,
            "status_code": 200,
            "message": `${req.body.first_name} ${req.body.last_name} was registered successfully`
        })
    })
router.post("/editprofile",(req,res)=>{
    loginModel.updateOne({email: req.body.email},{$set: {first_name: req.body.first_name, last_name: req.body.last_name, mobile: req.body.mobile, gender: req.body.gender, date_of_birth: req.body.dob }},(err,data)=>{
        if(data){
            res.json({
                "success": true,
                "status_code": 200,
                "message": "Profile Editted successfully."
            })        
        }
        else{
            res.json({
                "success": false,
                "status_code": 400,
                "message": "Internal server error."
            })
        }
    })
})    
router.post("/forgotPassword", (req, res) => {
    loginModel.findOne({ email: req.body.email }, (err, data) => {
        if (err) throw err;
        if (data) {
            if (data.email === req.body.email) {
                const mailData = {
                    from: 'NeoStore',
                    // to: "singhgaurav9876@gmail.com",
                    to: req.body.email,
                    subject: 'otp for password reset',
                    html: `<b>NeoStore</b><br> Someone (hopefully you) has requested a password reset for your NeoStore account. Use the below given otp to set a new password:<br/>${otp}`,
                };
                transporter.sendMail(mailData, function (err, info) {
                    if (err) {
                        return console.log(err)
                    }
                    else {
                        res.json({ success: true })
                    }
                });
            }
            else {
                res.json({ success: false })
            }
        }
        else {
            res.json({ success: false })
        }
    })
})
router.post("/recoverPassword", (req, res) => {
    if (otp == req.body.otp) {
        const saltRounds = 10;
        const myPlaintextPassword = req.body.password;
        const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds)
        loginModel.updateOne({ email: req.body.email }, { $set: { password: hash } },(err,data)=>{
            if (err){
                console.log(err);
            }
            else{
                res.json({
                    "success": true,
                    "status_code": 200,
                    "message": "Password recovered successfully."
                })         
            }
        })
    }
    else {
        res.json({
            "success": false,
            "status_code": 200,
            "message": "Invalid Otp Try Again!"
        })
    }
})
router.post("/changePassword", (req, res) => {
    const saltRounds = 10;
    const myPlaintextPassword = req.body.newpass;
    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds)
    loginModel.updateOne({ email: req.body.email }, { $set: { password: hash } },(err,data)=>{
        if(data){
            res.json({
                "success": true,
                "status_code": 200,
                "message": "Password changed successfully."
            })        
        }
        else{
            res.json({
                "success": false,
                "status_code": 400,
                "message": "Internal server error."
            })
        }
    })
})
module.exports = router;