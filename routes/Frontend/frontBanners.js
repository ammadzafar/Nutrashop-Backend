var express = require('express');
var router = express.Router();
var multer = require("multer")
var upload = multer()
const {body} = require('express-validator');
const banner = require("../../controllers/Frontend/BannersController")

router.get("/",banner.findAll)

module.exports = router;