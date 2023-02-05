var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
var multer = require('multer')
const bodyUpload = multer()
const inTransit = require('../../../controllers/Backend/Order/InTransitController')


router.get('/' , inTransit.InTransit)
router.get('/:id',inTransit.OneInTransit)
module.exports =  router