var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
const upload = require("../../middleware/ProductImagesUpload");
const excelUpload = require("../../middleware/ExcelUpload");
const products = require("../../controllers/Backend/ProductController");
var multer = require('multer')
const bodyUpload = multer()

// Create a new Product
router.post("/",
    upload.array("files"),
    body('name').not().isEmpty().trim().withMessage('Product name is required'),
    body('description').not().isEmpty().trim().withMessage('Product description is required'),
    products.create)

// // All Products
router.get("/", products.findAll)



//Toggle Popular
router.put("/togglePopular/:id",
    upload.single('file'),
    body('isPopular').not().isEmpty().escape().trim(),
    products.togglePopular)


// Get Single Product
router.get("/:id",products.findOne)
//update product
router.put("/:id",
    upload.array("files"),
    body('name').not().isEmpty().trim().withMessage('Product name is required'),
    body('description').not().isEmpty().trim().withMessage('Product description is required'),
    products.update
)

// Retrieve a single product with id
router.get("/:id", products.findOne)


// delete product
router.delete("/:id",products.delete)
// //Import Brands
// router.post("/import", excelUpload.single("file"), brands.import);

// update stock
router.post('/update/stock/:id',
    bodyUpload.none(),
    products.updateStock);

// newly products
router.get('/new-products',
    products.newProducts);



module.exports = router;
