var express = require('express');
var router = express.Router();
const roles = require("../../controllers/Backend/RoleController");
var multer = require('multer')
const bodyUpload = multer()



router.post("/",
    bodyUpload.none(''),
    roles.create)

router.put("/update/:id",
    bodyUpload.none(''),
    roles.update)

router.get("/",
    roles.findAll)

router.delete("/delete/:id",
    roles.deleteOne)

router.get("/:id",
    roles.findOne)

module.exports = router