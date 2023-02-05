var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
const upload = require("../../../middleware/BrandImageUpload");
const authJWT = require("../../../middleware/authJwt");
const wishlist = require("../../../controllers/Frontend/Wishlist/WishlistController");
const { validate} = require('express-validation')
const {wishlistSchema}=require("../../../validators/frontend/Wishlist/store")


// Add to wishlist
router.post("/",
    [upload.none("")],
    validate(wishlistSchema, {}, {}),
   wishlist.addToWishlist
)
router.post("/remove",
    upload.none(""),
    validate(wishlistSchema, {}, {}),
    wishlist.removeFromWishlist
)
router.post("/products",
    upload.none(""),
    wishlist.products
)

module.exports = router;
