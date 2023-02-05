var express = require('express');
var router = express.Router();
var multer = require("multer")
var upload = multer()
const {body} = require('express-validator');
const customer = require('../../controllers/Backend/CustomerController')
//create customer
router.post("/",
    upload.none(),
    body("firstName").not().isEmpty().trim().escape().withMessage('Customer name is required'),
    body("email").not().isEmpty().trim().escape().withMessage('Customer email is required'),
    customer.create)
// findAll customers
router.get("/",customer.findAll)

router.get("/:id",customer.findOne)

router.delete("/:id", customer.delete)

router.put("/:id",
    upload.none(),
    body("firstName").not().isEmpty().trim().escape().withMessage('Customer name is required to update'),
    body("email").not().isEmpty().trim().escape().withMessage('Customer name is required to update'),
    customer.update)

module.exports = router;