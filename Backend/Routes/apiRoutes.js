const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const blogModel = require('../Db/blogSchema') 
const jwtSecret = "asdasd324234#@$dgdfg";
function authenticateToken(req, res, next) {
    let token = req.body.token
    if (token == null) {
        res.json({ "err": 1, "msg": "Token not match" })
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": 1, "msg": "Token incorrect" })
            }
            else {
                next();
            }
        })
    }
}
router.post("/addpost", (req,res)=>{
    new blogModel(req.body).save(() => {
        res.send("post added");
    })
})
router.get("/getpost", (req,res)=>{
    blogModel.find({}, (err, data) => {
        if (err) throw err;
        if (data) {
            res.json({ success: true, pdata: data });
        }
    })
})
module.exports = router;