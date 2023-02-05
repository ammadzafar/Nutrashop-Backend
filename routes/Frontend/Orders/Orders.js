var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
const orders = require("../../../controllers/Frontend/OrderController");
var multer = require('multer')
const bodyUpload = multer()


// Orders
router.get("/:id",orders.findAll)
router.get("/single/:id", orders.findOneOrder)
router.post("/cb/payment/:id",
    bodyUpload.none(),
    orders.paymentCB)
router.post("/mark-payment/:id", orders.markPaymentStatus)


module.exports = router;