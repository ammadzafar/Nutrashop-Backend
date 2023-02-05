

var express =require('express');
var router = express.Router();
const filterCollections = require('../../controllers/Frontend/FilterCollectionController');
router.get('/',filterCollections.findAll)

module.exports = router