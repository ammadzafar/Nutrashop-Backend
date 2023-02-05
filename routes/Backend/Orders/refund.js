var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
var multer = require('multer')
const bodyUpload = multer()
const refund = require('../../../controllers/Backend/Order/RefundController')


router.get('/' , refund.Refund)
router.get('/:id',refund.OneRefund)
module.exports =  router