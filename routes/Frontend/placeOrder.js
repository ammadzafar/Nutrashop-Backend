var express = require('express');
var router = express.Router();
const order = require("../../controllers/Frontend/PlaceOrderController");
var multer = require('multer')
const bodyUpload = multer()


router.post("/",
    bodyUpload.none(),
    order.create)



module.exports = router;
