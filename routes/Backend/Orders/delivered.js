var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
var multer = require('multer')
const bodyUpload = multer()
const delivered = require('../../../controllers/Backend/Order/DeliveredController')


router.get('/' , delivered.Delivered)
router.get("/:id" , delivered.OneDelivered)
module.exports =  router

