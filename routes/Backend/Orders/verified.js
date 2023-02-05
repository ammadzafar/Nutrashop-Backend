var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
var multer = require('multer')
const bodyUpload = multer()
const verified = require('../../../controllers/Backend/Order/VerifiedController')
          //   path function
router.get('/',verified.Verified)
router.get('/:id',verified.OneVerified)
router.get('/booking/:id',verified.booking)
router.get('/update-shipping/:id/:shipping',verified.updateShipping)

module.exports= router