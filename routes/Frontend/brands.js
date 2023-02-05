var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
const upload = require("../../middleware/BrandImageUpload");
const brands = require("../../controllers/Frontend/BrandController");



// All Brands
router.get("/",
    brands.findAll
)



module.exports = router;
