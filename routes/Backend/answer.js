var express = require('express');
var router = express.Router();
const answer = require("../../controllers/Backend/AnswerController");
var multer  = require('multer')
var upload = multer()

router.put("/:id",
    upload.none(''),
   answer.answerCreate)

router.put("/allowed/:id",
    upload.none(''),
   answer.toggleAllowed)

router.get("/",
   answer.findAll)


module.exports = router;
