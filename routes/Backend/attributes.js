var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
var multer = require('multer')
var upload = multer()
const attributes = require("../../controllers/Backend/AttributeController");

// Create
router.post("/",
    upload.none(),
    body('name').not().isEmpty().trim().escape().withMessage('Attribute name is required'),
    attributes.create)

router.post("/values/",
    upload.none(),
    body('data').not().isEmpty().trim().escape().withMessage('Attribute values is required'),
    attributes.createAttributeValues)

// All
router.get("/", attributes.findAll)

// find one
router.get("/:id", attributes.findOne)

// update
router.post("/update/:id",
    upload.none(),
    attributes.update
)

// delete
router.delete("/delete/:id", attributes.delete)

// // Retrieve a single Brand with id
// router.get("/:id", brands.findOne)
//
// //Update Brand
// router.put("/:id",
//     upload.single("file"),
//     body('name').not().isEmpty().trim().escape(),
//     brands.update)
//
//Delete Attribute
router.delete("/:id", attributes.delete)
//
// //Import Brands
// router.post("/import", excelUpload.single("file"), brands.import);

module.exports = router;
