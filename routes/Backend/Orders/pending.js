var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
var multer = require('multer')
const bodyUpload = multer()
const pending = require('../../../controllers/Backend/Order/PendingController')

//(path , function name)
router.get('/' , pending.Pending)

router.get("/:id" , pending.OnePending)


module.exports =  router