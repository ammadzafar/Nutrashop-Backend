var express = require('express');
var router = express.Router();
const upload = require("../../../middleware/BrandImageUpload");
const auth = require("../../../controllers/Frontend/Auth/AuthController");
var multer = require('multer')
const {verifySignUp} = require("../../../middleware");
const bodyUpload = multer()
const { validate} = require('express-validation')
const {loginSchema}=require("../../../validators/frontend/Auth/login")

//Sign Up
router.post("/signup",
    upload.none(""),
    [verifySignUp.checkDuplicateUsernameOrEmail],
    auth.signup
)
// Sign in
router.post("/signin",upload.none(""), validate(loginSchema, {}, {}),
    auth.signin)


module.exports = router;
