
var express = require('express');
var router = express.Router();
const cancelled = require('../../../controllers/Backend/Order/CancelledController')
const {body} = require('express-validator');
var multer = require('multer')
const bodyUpload = multer()


router.get('/',cancelled.Cancelled)
router.get("/:id" , cancelled.OneCancelled)

module.exports = router

