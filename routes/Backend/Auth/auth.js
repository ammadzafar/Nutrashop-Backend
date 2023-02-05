var express = require('express');
var router = express.Router();
const upload = require("../../../middleware/BrandImageUpload");
const auth = require("../../../controllers/Backend/Auth/auth");
var multer = require('multer')
const bodyUpload = multer()

// Create a new Brand
router.post("/signin",
    upload.none(""),
    auth.signin)


module.exports = router;
