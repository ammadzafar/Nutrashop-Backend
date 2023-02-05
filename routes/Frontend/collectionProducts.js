var express = require('express');
var router = express.Router();
const collections = require("../../controllers/Frontend/CollectionProductsController");



// Get Brand Products
router.get("/:slug", collections.findOne)



module.exports = router;
