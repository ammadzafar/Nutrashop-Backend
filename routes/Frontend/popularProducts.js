var express = require('express');
var router = express.Router();
const products = require("../../controllers/Frontend/PopularProductController");



// All Brands
router.get("/", products.findAll)
router.get("/new/products", products.newProducts)



module.exports = router;
