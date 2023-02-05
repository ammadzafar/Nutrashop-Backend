var express = require('express');
var router = express.Router();
const slider = require("../../controllers/Backend/SliderController.js");
var multer  = require('multer')
var upload = multer()



router.post("/create",
    upload.none(''),
    body('name').not().isEmpty().trim().withMessage('Slider name is required'),
    slider.create)

router.put("/:id",
    upload.none(''),
    body('name').not().isEmpty().trim().withMessage('Slider name is required'),
    slider.update)



module.exports = router;