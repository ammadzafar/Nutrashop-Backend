var express = require('express');
var router = express.Router();
var multer = require("multer")
var upload = multer()
const {body} = require('express-validator');
const customer = require('../../../controllers/Frontend/FrontCustomer/FrontEndCustomer')
const customerPassword = require('../../../controllers/Frontend/FrontCustomer/PasswordUpdate')
const customerAddress = require('../../../controllers/Frontend/FrontCustomer/AddressController')

router.get("/:id", customer.findOne)

router.put("/updatePhone/:id",
    upload.none(),
    customer.updatePhone)

router.put("/:id",
    upload.none(),
    body("firstName").not().isEmpty().trim().escape().withMessage('Customer name is required to update'),
    customer.update)

router.post("/:id",
    upload.none(""),
    customerPassword.passwordUpdate
)

router.post("/address/:id",
    upload.none(),
    customerAddress.store)

router.post("/address/update/:id",
    upload.none(),
    customerAddress.update)

router.get("/addresses/:id",
    upload.none(),
    customerAddress.getCustomerAddresses)

router.get("/address/:id/:addressId",
    upload.none(),
    customerAddress.getSingleCustomerAddresses)

module.exports = router;
