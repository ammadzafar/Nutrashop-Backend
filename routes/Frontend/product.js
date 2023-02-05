var express = require('express');
var router = express.Router();
const product = require("../../controllers/Frontend/ProductController");



// Get Brand Products
router.get("/:slug", product.fineOne)



module.exports = router;
