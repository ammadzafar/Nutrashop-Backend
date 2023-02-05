var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
const upload = require("../../middleware/BrandImageUpload");
const brands = require("../../controllers/Frontend/BrandProductsController");



// Get Brand Products
router.get("/:slug", brands.findOne)



module.exports = router;
