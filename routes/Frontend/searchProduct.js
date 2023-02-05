var express = require ('express')
var router = express.Router()
const products = require("../../controllers/Frontend/SearchProductController")
var multer = require('multer')
const bodyUpload = multer()

//search Product
router.get("/",
    bodyUpload.none(),
    products.searchProducts)

module.exports = router