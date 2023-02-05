var express = require('express');
var router = express.Router()
const {body} = require('express-validator');
const variation = require("../../controllers/Backend/VariationController.");
var multer  = require('multer')
const upload = require("../../middleware/VariationImageUploader");
var bodyUpload = multer()

router.post("/:id",
    bodyUpload.none(),
    variation.create)

router.put("/forImage/",
    bodyUpload.none(),
    variation.createImage)

router.put("/:id",
    upload.array('files'),
    variation.edit)

router.get("/allProductVariations/:id",
    variation.findAllVariantsOfProduct)

router.get("/findOne/:id",
    variation.findOne)
module.exports = router;
