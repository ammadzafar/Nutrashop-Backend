var express = require('express');
var router = express.Router();
const collections = require("../../controllers/Frontend/PopularCollectionController");



// All Collections
router.get("/", collections.findAll)



module.exports = router;
