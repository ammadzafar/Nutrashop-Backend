var express = require("express");
var router = express.Router();
const questionAnswer = require("../../controllers/Frontend/QuestionAnswerController");
var multer = require("multer");
var upload = multer();

router.post("/", upload.none(""),
    questionAnswer.questionCreate);

router.get("/:id", upload.none(""),
    questionAnswer.findAllQuestionAnswers);

module.exports = router;
