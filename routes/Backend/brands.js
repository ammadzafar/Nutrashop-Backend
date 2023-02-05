var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
const upload = require("../../middleware/BrandImageUpload");
const excelUpload = require("../../middleware/ExcelUpload");
const brands = require("../../controllers/Backend/BrandController");
var multer = require('multer')
const bodyUpload = multer()

// Create a new Brand
router.post("/",
    upload.single("file"),
    body('name').not().isEmpty().trim().withMessage('Brand name is required'),
    body('isPopular').not().isEmpty().trim().withMessage('Popular field is required'),
    brands.create)

// All Brands
router.get("/", brands.findAll)

// Retrieve a single Brand with id
router.get("/:id", brands.findOne)


//Update Brand
router.put("/:id",
    upload.single("file"),
    body('name').not().isEmpty().trim(),
    brands.update)


//Check togglePopular
router.put("/togglePopular/:id",
    bodyUpload.none(), body('isPopular').not().isEmpty().trim(),
    brands.togglePopular)


//Delete Brand
router.delete("/:id", brands.delete)

//Import Brands
router.post("/import", excelUpload.single("file"), brands.import);

module.exports = router;
