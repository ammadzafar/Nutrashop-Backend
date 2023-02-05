'use strict';
require('dotenv').config()
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV;
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.brands = require("./brand.js")(sequelize, Sequelize);
db.collections = require("./collection")(sequelize, Sequelize);
db.products = require("./product")(sequelize, Sequelize);
db.slider = require("./slider")(sequelize, Sequelize); 

db.coupondiscount = require("./coupondiscount")(sequelize,Sequelize)
db.couponDiscountProducts = require("./coupondiscountproducts")(sequelize,Sequelize)

db.attributes = require("./attribute")(sequelize, Sequelize);
db.attributeValues = require("./attributevalue")(sequelize, Sequelize);
db.variants = require("./variant")(sequelize, Sequelize);
db.attributeProducts = require("./attributeproduct")(sequelize, Sequelize);
db.collectionProducts = require("./collectionproducts")(sequelize, Sequelize);
db.productImages = require("./productimage")(sequelize, Sequelize);
db.menus = require("./menu")(sequelize, Sequelize);
db.collectionMenus = require("./collectionmenus")(sequelize, sequelize)
db.customers=require("./customer")(sequelize,sequelize)
db.menus = require("./menu")(sequelize, Sequelize);
db.orders = require("./order")(sequelize, Sequelize);
db.orderProducts = require("./orderproducts")(sequelize, Sequelize);
db.reviews=require("./review")(sequelize,Sequelize)
db.users = require("./user")(sequelize, Sequelize);
db.roles = require("./role")(sequelize, Sequelize);
db.modules = require("./module")(sequelize, Sequelize);
db.moduleRoles = require("./modulerole")(sequelize, Sequelize);
db.statuses = require("./status")(sequelize, Sequelize);
db.wishlist=require("./wishlist")(sequelize,Sequelize)
db.answerQuestion=require("./answerquestion")(sequelize,Sequelize)
db.banners = require("./banner")(sequelize, Sequelize);
db.address = require("./address")(sequelize, Sequelize);
db.collectionChildCollections = require("./collectionchildcollections")(sequelize, Sequelize);
db.orderVariants = require("./ordervariants")(sequelize, Sequelize);
db.attributeValuesVariants =  require("./attributesvaluesvariants.js")(sequelize, Sequelize);
db.variantValues = require("./variantvalue.js")(sequelize, Sequelize);
db.variantImages = require("./variantimage.js")(sequelize, Sequelize);
//Relations

//Menu
// db.collections.hasMany(db.menus,{constraints:true,as:'collectionMenu',foreignKey: "menuCollection"})
db.collections.hasOne(db.menus)
db.menus.belongsTo(db.collections,{foreignKey:"menuCollection"})

db.attributes.hasMany(db.attributeValues, {as: 'values', onDelete: 'CASCADE'})
db.brands.hasMany(db.products, {as: 'products',onDelete:'SET NULL'})
// order variants
db.products.hasMany(db.variants)
db.variants.belongsTo(db.products, {onDelete: 'CASCADE'})
db.products.belongsToMany(db.attributes, {through: db.attributeProducts, constraints: true, as: 'attributes', foreignKey: 'productId'})
db.attributes.belongsToMany(db.products, {through: db.attributeProducts, constraints: true, as: 'products', foreignKey: 'attributeId'})
db.attributeValues.belongsTo(db.attributes, {constraints: true, onDelete: 'CASCADE'})
db.collections.belongsToMany(db.products,{through:db.collectionProducts, constraints: true,as:'products',foreignKey: "collectionId"})
// db.collections.hasMany(db.collectionProducts, {constraints: true, as: 'products'})
db.products.belongsToMany(db.collections,{through:db.collectionProducts, constraints: true,as:'collections',foreignKey: "productId",})
// db.products.hasMany(db.collectionProducts, {constraints: true, as: 'collections'})
db.products.belongsTo(db.brands)
db.products.hasMany(db.productImages, {constraints: false, onDelete: 'CASCADE', as: 'images'})
db.variants.hasMany(db.variantImages, {constraints: false, onDelete: 'CASCADE', as: 'variantImg'})

db.collections.belongsToMany(db.menus, {through: db.collectionMenus, constraints: true, as: 'menus',  foreignKey: "collectionId",})
db.menus.belongsToMany(db.collections, {through: db.collectionMenus, constraints: true,as:'collections',  foreignKey: "menuId",})
// db.collections.hasMany(db.collections, {as: 'collections',foreignKey:'collectionId'})
db.collections.belongsToMany(db.collections,{through:db.collectionChildCollections,onDelete:"CASCADE", constraints:true, as:'parentCollections', foreignKey:'parentCollectionId',otherKey:'childCollectionId'})
db.collections.belongsToMany(db.collections,{through:db.collectionChildCollections, constraints:true,onDelete:"CASCADE", as:'childCollections', foreignKey:'childCollectionId',otherKey:'parentCollectionId'})
db.customers.hasMany(db.orders)

db.orders.hasMany(db.orderVariants);
db.orderVariants.belongsTo(db.variants);

db.orders.belongsTo(db.customers,{as:'customer'})
db.orders.hasMany(db.orderProducts)
// db.orders.belongsTo(db.orderProducts)
db.orderProducts.belongsTo(db.products)
db.orders.belongsTo(db.statuses)
// db.statuses.belongsTo(db.orders)

// attribute values and variants relations
db.attributeValues.belongsToMany(db.variants,{through:db.attributeValuesVariants, constraints:true, as:"attributeValues" , foreignKey:"variantId"})
db.variants.belongsToMany(db.attributeValues,{through:db.attributeValuesVariants, constraints:true, as:"variant" , foreignKey:"attributeValueId"})
//reviews
db.products.hasMany(db.reviews,{as :'reviews'})
db.reviews.belongsTo(db.products)
// reviews and orderProducts
db.orderVariants.hasOne(db.reviews)
db.reviews.belongsTo(db.orderVariants)
db.customers.hasMany(db.reviews)
db.reviews.belongsTo(db.customers)
db.users.belongsTo(db.roles,{as:'role',foreignKey:'roleId'});
// db.roles.hasMany(db.users, {as: 'users',onDelete:'SET NULL'})

db.roles.belongsToMany(db.modules,{through:db.moduleRoles, constraints: true, as: 'modules',  foreignKey: "roleId"})
db.modules.belongsToMany(db.roles,{through:db.moduleRoles, constraints: true, as: 'roles',  foreignKey: "moduleId"})
db.customers.belongsToMany(db.products,{through:db.wishlist, constraints: true, as: 'wishlist',  foreignKey: "customerId"})
db.products.belongsToMany(db.customers,{through:db.wishlist, constraints: true, as: 'wishlist',  foreignKey: "productId"})
// db.modules.belongsToMany(db.roles,{through:db.moduleRoles})

// db.reviews.hasMany(db.answerQuestion)
// db.answerQuestion.belongsTo(db.reviews)
db.products.hasMany(db.answerQuestion)

//questionAnswer and Customer
db.answerQuestion.belongsTo(db.customers)
db.answerQuestion.belongsTo(db.users)
db.answerQuestion.belongsTo(db.products)

// banner relation with product and collection
db.products.hasOne(db.banners)
db.banners.belongsTo(db.products)
db.collections.hasOne(db.banners)
db.banners.belongsTo(db.collections)

// customer relation with addresses
db.customers.hasMany(db.address)
db.address.belongsTo(db.customers)


//discount coupons  relations
db.coupondiscount.belongsToMany(db.products,{through:db.couponDiscountProducts,as:'product', constraints: true, foreignKey: "discountCouponId"})
db.products.belongsToMany(db.coupondiscount,{through:db.couponDiscountProducts,as:'couponDiscount', constraints: true, foreignKey: "productId"})

module.exports = db;
