var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
const menus = require("../../controllers/Backend/MenuController")
const newMenus = require("../../controllers/Backend/NewMenuController")
var multer  = require('multer')
var upload = multer()

// Create a new Menu
router.post("/",
    upload.none(),
    body('name').not().isEmpty().trim().withMessage('Menu name is required'),
    menus.create)

// All Menus
router.get("/", menus.findAll)

// Retrieve a single Menu with id
router.get("/:id", menus.findOne)

// //Update Menu
router.put("/:id",
    upload.none(),
    body('name').not().isEmpty().trim(),
    newMenus.updateOne)

//Delete Menu
router.delete("/:id", newMenus.destroyOne)

module.exports = router;
