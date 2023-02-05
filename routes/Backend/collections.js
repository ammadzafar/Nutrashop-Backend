var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
const upload = require("../../middleware/CollectionImageUpload");
const collection = require("../../controllers/Backend/CollectionController");
var multer = require("multer");
var bodyUpload = multer()

// Create a new Collection
router.post("/",
    upload.single("file"),
    body('name').not().isEmpty().trim().withMessage('Collection name is required'),
    body('isPopular').not().isEmpty().trim().withMessage("Collection name is required"),
    collection.create)

// All Brands
router.get("/", collection.findAll)

// Retrieve a single Brand with id
router.get("/:id", collection.findOne)
// retrieve all parent collections
router.get('/allParents',collection.findAllParents)
//Update Brand
router.put("/:id",
    upload.single("file"),
    body('name').not().isEmpty().trim(),
    collection.update)

//updateIsPopular
router.put("/togglePopular/:id",
    upload.single('file'),
    body('isPopular').not().isEmpty().trim(),
    collection.updatePopular)
router.post('/childCol',bodyUpload.none(),collection.testingDataValue)
//Delete Brand
router.delete("/:id", collection.delete)
module.exports = router;
