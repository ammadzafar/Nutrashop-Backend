var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
const upload = require("../../middleware/BrandImageUpload");
const excelUpload = require("../../middleware/ExcelUpload");
const review = require("../../controllers/Backend/ReviewBackendController")
var multer = require('multer')
const bodyUpload = multer()



// // All Reviews
router.get("/", review.findAll)

// // Retrieve a single Review with id
// router.get("/:id", review.findOne)


// //Update Review
router.put("/allowed/:id",
bodyUpload.none(),
 review.update)
//make top review
router.put("/top/:id",
    bodyUpload.none(),
    review.makeTop)
 module.exports = router;
