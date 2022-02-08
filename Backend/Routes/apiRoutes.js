const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
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
// fetch product ----------------------------------------------------------------------------
router.get("/", (req, res) => {
    productModel.find().populate(["category_id", "color_id"]).then(product => {
        res.send(product)
    })
}) 
router.post("/fetchproduct", (req, res) => {
    let findArg = req.body.filterArgs!=undefined?req.body.filterArgs:{};
    let order = req.body.order ? req.body.order : "asc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "created_at";
    productModel.find(findArg).populate(["category_id", "color_id"]).sort([[sortBy, order]]).then(product => {
        res.send(product)
    })
})


module.exports = router;