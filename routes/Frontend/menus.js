var express = require('express');
var router = express.Router();
const menus = require("../../controllers/Frontend/MenuController");



// All Brands
router.get("/", menus.findAll)



module.exports = router;
