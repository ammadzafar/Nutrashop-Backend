var express = require('express');
var router = express.Router();
const coupon = require("../../controllers/Backend/DiscountCoupon");
var multer  = require('multer')
var upload = multer()

router.post("/create",
    upload.none(''),
    coupon.create)

router.put("/:id",
    upload.none(''),
    coupon.update)

router.get("/all-coupons",
    coupon.findAll)


router.get("/:id",
    coupon.findOne)

router.delete("/:id",
    coupon.deleteOne)


module.exports = router;
