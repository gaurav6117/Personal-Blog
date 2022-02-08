const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path")
const jwt = require("jsonwebtoken");
const jwtSecret = "asdasd324234#@$dgdfg";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.toLowerCase() + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
router.post("/addcategory", (req, res) => {
    new categoryModel(req.body).save(() => {
        res.send("Category added");
    })
})
router.get('/getcategories', (req, res) => {
    categoryModel.find({}, (err, data) => {
        if (err) throw err;
        if (data) {
            res.json({ success: true, cdata: data });
        }
    })
})
router.post("/addproduct", upload.array('sub_images', 10), (req, res) => {
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/public/' + req.files[i].filename)
    }
    new productModel({ product_name: req.body.product_name, product_image: JSON.parse(req.body.product_image), product_desc: req.body.product_desc, product_rating: req.body.product_rating, product_producer: req.body.product_producer, product_cost: req.body.product_cost, product_dimension: req.body.product_dimension, product_material: req.body.product_material, product_stock: req.body.product_stock, color_id: req.body.color_id, category_id: req.body.category_id, product_subimage: reqFiles }).save()
        .then(data => {
            res.status(201).json({
                name: data.product_name,
                sub_images: data.product_subimage,
                image: data.product_image
            })
        })
})
module.exports = router;