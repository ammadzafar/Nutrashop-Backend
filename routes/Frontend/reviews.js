var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
const upload = require("../../middleware/BrandImageUpload");
const excelUpload = require("../../middleware/ExcelUpload");
const review = require("../../controllers/Frontend/ReviewController");
var multer = require('multer')
const bodyUpload = multer()

// Create a new Review
router.post("/",
bodyUpload.none(),
 review.create)

// // All Reviews
router.get("/:id", review.findAll)


// // Retrieve a single Review with id
router.get("/:id", review.findOne)


// //Update Review
router.put("/:id",
bodyUpload.none(),
 review.update)


// //Delete Review
router.delete("/:id", review.delete)

//top Reviews
// top reviews
router.get("/top/reviews", review.topReviews)


module.exports = router;
