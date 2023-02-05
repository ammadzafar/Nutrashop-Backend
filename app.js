var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const {  ValidationError } = require('express-validation')
global.__basedir = __dirname;
var indexRouter = require('./routes/index');
//Backend Routes
var brandsRouter = require('./routes/Backend/brands');
var collectionsRouter = require('./routes/Backend/collections');
var productsRouter = require('./routes/Backend/products');
var attributesRouter = require('./routes/Backend/attributes');
var menusRouter = require('./routes/Backend/menus');
var pendingRouter=require('./routes/Backend/Orders/pending');
var cancelledRouter = require('./routes/Backend/Orders/cancelled');
var verifiedRouter = require('./routes/Backend/Orders/verified');
var refundRouter = require('./routes/Backend/Orders/refund');
var inTransitRouter = require('./routes/Backend/Orders/inTransit');
var deliveredRouter = require('./routes/Backend/Orders/delivered');
var customerRouter = require('./routes/Backend/customers');
var statusUpdateRouter = require('./routes/Backend/Orders/statusUpdate');
var authRouter = require('./routes/Backend/Auth/auth');
var moduleRouter = require("./routes/Backend/modules");
var roleRouter = require("./routes/Backend/roles");
var answerRouter = require("./routes/Backend/answer");
var userRouter = require("./routes/Backend/users");
var backReviewRouter = require("./routes/Backend/ReviewBackend");
var bannerRouter = require("./routes/Backend/banners");
var totalRouter = require("./routes/Backend/TotalController");
var variantRouter = require("./routes/Backend/variants");
var discountCouponRouter = require("./routes/Backend/discountCoupon")
var excelToPdfRouter = require("./routes/Backend/excelToPdf")

//Frontend Routes
var customerBrandsRouter = require('./routes/Frontend/brands')
var popularCollectionsRouter = require('./routes/Frontend/popularCollections')
var popularProductsRouter = require('./routes/Frontend/popularProducts')
var brandProductsRouter = require('./routes/Frontend/brandProducts')
var collectionProductsRouter = require('./routes/Frontend/collectionProducts')
var customerMenusRouter = require('./routes/Frontend/menus')
var productRouter = require('./routes/Frontend/product')
var placeOrderRouter = require('./routes/Frontend/placeOrder')
var filterControllerRouter = require('./routes/Frontend/filterCollections')
var searchRouter = require('./routes/Frontend/searchProduct')
var customerAuthRouter = require('./routes/Frontend/Auth/auth');
var wishlistRouter = require('./routes/Frontend/Wishlist/wishlist')
var questionRouter = require('./routes/Frontend/questionAnswer')
var frontOrdersRouter = require('./routes/Frontend/Orders/Orders')
var reviewsRouter = require('./routes/Frontend/reviews')
var frontCustomerRouter = require('./routes/Frontend/FrontCustomer/customerFrontend')
var frontBannerRouter = require('./routes/Frontend/frontBanners')

var app = express();
require('dotenv').config()


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Base path for images
app.use(express.static('resources/static/assets/uploads'));
app.use('/', indexRouter);

//Routes Files
app.use('/', indexRouter);
app.use('/api/brands', brandsRouter);
app.use('/api/collections', collectionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/attributes', attributesRouter);
app.use('/api/menus', menusRouter);
app.use('/api/orders/pending', pendingRouter);
app.use('/api/orders/cancelled', cancelledRouter);
app.use('/api/orders/verified',verifiedRouter);
app.use('/api/orders/refund',refundRouter);
app.use('/api/orders/inTransit',inTransitRouter);
app.use('/api/orders/delivered',deliveredRouter);
app.use('/api/customer', customerRouter);
app.use('/api/orders/statusUpdate',statusUpdateRouter);
app.use('/api/auth',authRouter);
app.use('/api/modules',moduleRouter);
app.use('/api/roles',roleRouter);
app.use('/api/answer',answerRouter);
app.use('/api/users',userRouter);
app.use('/api/reviews',backReviewRouter);
app.use('/api/banners',bannerRouter);
app.use('/api/totalcontrollers',totalRouter);
app.use('/api/variants',variantRouter);
app.use('/api/discount-coupons',discountCouponRouter);
// Convert Excel to Pdf 
app.use('/api/upload/excelFile',excelToPdfRouter);

//Frontend Routes File
app.use('/api/frontend/brands', customerBrandsRouter);
app.use('/api/frontend/collections', popularCollectionsRouter);
app.use('/api/frontend/popularProducts', popularProductsRouter);
app.use('/api/frontend/brandProducts', brandProductsRouter);
app.use('/api/frontend/collectionProducts', collectionProductsRouter);
app.use('/api/frontend/menus', customerMenusRouter);
app.use('/api/frontend/product', productRouter);
app.use('/api/frontend/place/order', placeOrderRouter);
app.use('/api/frontend/search',searchRouter);
app.use('/api/frontend/filterController',filterControllerRouter);
app.use('/api/frontend/auth',customerAuthRouter);
app.use('/api/frontend/wishlist', wishlistRouter);
app.use('/api/frontend/question', questionRouter);
app.use('/api/frontend/orders', frontOrdersRouter);
app.use('/api/frontend/reviews', reviewsRouter);
app.use('/api/frontend/customer',frontCustomerRouter);
app.use('/api/frontend/banner',frontBannerRouter);


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  return res.status(500).json(err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

