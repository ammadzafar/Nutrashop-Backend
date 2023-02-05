var express = require('express');
var router = express.Router();
const modules = require("../../controllers/Backend/ModuleController");
var multer = require('multer')
const bodyUpload = multer()



// All Brands
router.get("/", modules.findAll)

module.exports = router;
