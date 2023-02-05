var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
var multer = require('multer')
const bodyUpload = multer()
const statusUpdate = require('../../../controllers/Backend/Order/StatusUpdateController')


router.put('/:id',
    bodyUpload.none(),body('statusId').trim().not().isEmpty()
    ,statusUpdate.UpdateStatus)

router.put('/isSeen/:id'
    ,statusUpdate.isSeen)

router.get('/allUnread'
    ,statusUpdate.allUnread)



module.exports =  router