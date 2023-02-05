var express = require('express');
var router = express.Router();
const total = require("../../controllers/Backend/TotalController");
var multer  = require('multer')
var upload = multer()


router.get("/orders",
total.allOrders)


router.get("/products",
total.allProducts)

router.get("/allTotal",
total.allTotal)

router.get("/orderDetails",
total.orderDetails)

router.get("/customers",
total.allCustomers)

router.get("/brands",
total.allBrands)

router.get("/menus",
total.allMenus)

router.get("/collections",
total.allCollections)

router.get("/canclledOrders",
total.allCanclledOrders)

router.get("/deliveredOrders",
total.allDeliveredOrders)

router.get("/inTransitOrders",
total.allInTransitOrders)

router.get("/pendingOrders",
total.allPendingOrders)

router.get("/refundOrders",
total.allRefundOrders)

router.get("/verifiedOrders",
total.allVerifiedOrders)

router.get("/latestProducts",
total.latestProducts)

router.get("/latestCustomers",
total.latestCustomers)

router.get("/latestReviews",
total.latestReviews)

router.get("/latestAnswerQuestion",
total.latestAnswerQuestion)

module.exports = router;
