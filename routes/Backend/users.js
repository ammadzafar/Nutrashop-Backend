var express = require('express');
var router = express.Router()
const {body} = require('express-validator');
const user = require("../../controllers/Backend/UserController");
const upload = require("../../middleware/UserImageUploader")
var multer  = require('multer')
var bodyUpload = multer()

router.post("/",
    bodyUpload.none(),
    user.create)

router.put("/:id",
    bodyUpload.none(),
    user.updateOne)

router.get("/",
    user.findAll)

router.get("/:id",
    user.findOne)

router.delete   ("/:id",
    user.destroyOne)


module.exports = router;
