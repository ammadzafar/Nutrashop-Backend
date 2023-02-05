var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
const banners = require("../../controllers/Backend/BannerController");
const upload = require("../../middleware/BannerImageUpload");
const uploadMobile = require("../../middleware/BannerImageMultiUpload");
const multiUpload = require("../../middleware/BannerUpdate");
var multer = require('multer')
const bodyUpload = multer()


router.post("/",
    bodyUpload.none(),
    body('placeholder').not().isEmpty().trim().withMessage('PlaceHolder name is required'),
    banners.create)

router.get("/",
    banners.findAll)

router.get("/:id",
    banners.findOne)

router.put("/:id",
    uploadMobile.single("mobileImage"),
    body('placeholder').not().isEmpty().trim().withMessage('PlaceHolder name is required'),
    banners.updateImage)

router.put("/edit/:id",
    bodyUpload.none(),
    body('placeholder').not().isEmpty().trim().withMessage('PlaceHolder name is required'),
    banners.updateCompleteBanner)

router.post("/addBannerimage",
    upload.single("image"),
    banners.addBannerimage)

router.post("/addMobileImage/",
    uploadMobile.single("mobileImage"),
    banners.addMobileImage)

router.put("/addBid/:id",
    bodyUpload.none(""),
    banners.addBid)

router.delete("/delete/:id",
    banners.deleteOne)

module.exports = router