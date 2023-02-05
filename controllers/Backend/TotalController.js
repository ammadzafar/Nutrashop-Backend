const models = require("../../models");
const Orders = models.orders;
const Products = models.products;
const Customers = models.customers;
const Brands = models.brands;
const Menus = models.menus;
const Collections = models.collections;
const Reviews = models.reviews;
const AnswerQuestion = models.answerQuestion;
const db = models.sequelize;

const fs = require("fs");

async function allOrders(req, res) {
    
    const transaction = await db.transaction();
  
    try {
      let allOrders = await Orders.count({ transaction });
  
      transaction.commit();
      return res.status(200).json(allOrders);
    } catch (e) {
      transaction.rollback();
      return res.status(500).send(err);
    }
  }

async function allProducts(req, res) {

  const transaction = await db.transaction();

  try {
    let allProducts = await Products.count({ transaction });

    transaction.commit();
    return res.status(200).json(allProducts);
  } catch (e) {
    transaction.rollback();
    return res.status(500).send(err);
  }
}

async function allTotal(req, res) {

    const transaction = await db.transaction();

    try {
        let allProducts = await Products.count({transaction});
        let allOrders = await Orders.count({transaction});
        let allCustomers = await Customers.count({transaction});
        let allBrands = await Brands.count({transaction});
        let allMenus = await Menus.count({transaction});
        let allCollections = await Collections.count({transaction});

        let totalArray = {
            allProducts: allProducts,
            allOrders: allOrders,
            allCustomers: allCustomers,
            allBrands: allBrands,
            allMenus: allMenus,
            allCollections: allCollections,
        };

        transaction.commit();
        return res.status(200).json(totalArray);
    } catch (e) {
        transaction.rollback();
        return res.status(500).send(err);
    }
}
async function allCustomers(req, res) {
    
    const transaction = await db.transaction();
  
    try {
      let allCustomers = await Customers.count({ transaction });
  
      transaction.commit();
      return res.status(200).json(allCustomers);
    } catch (e) {
      transaction.rollback();
      return res.status(500).send(err);
    }
  }
  

  async function allBrands(req, res) {
    
    const transaction = await db.transaction();
  
    try {
      let allBrands = await Brands.count({ transaction });
  
      transaction.commit();
      return res.status(200).json(allBrands);
    } catch (e) {
      transaction.rollback();
      return res.status(500).send(err);
    }
  }

  async function allMenus(req, res) {
    
    const transaction = await db.transaction();
  
    try {
      let allMenus = await Menus.count({ transaction });
  
      transaction.commit();
      return res.status(200).json(allMenus);
    } catch (e) {
      transaction.rollback();
      return res.status(500).send(err);
    }
  }

  async function allCollections(req, res) {
    
    const transaction = await db.transaction();
  
    try {
      let allCollections = await Collections.count({ transaction });
  
      transaction.commit();
      return res.status(200).json(allCollections);
    } catch (e) {
      transaction.rollback();
      return res.status(500).send(err);
    }
  }

//AllOrdersTotalControllers

async function orderDetails(req, res) {

    const transaction = await db.transaction();

    try {
        let allCanclledOrders = await Orders.count({
            where: { statusId: 3 },
        },{ transaction });
        let allDeliveredOrders = await Orders.count({
            where: { statusId: 5 },
        },{ transaction });
        let allInTransitOrders = await Orders.count({
            where: { statusId: 6 },
        },{ transaction });
        let allPendingOrders = await Orders.count({
            where: { statusId: 1 },
        },{ transaction });
        let allRefundOrders = await Orders.count({
            where: { statusId: 4 },
        },{ transaction });
        let allVerifiedOrders = await Orders.count({
            where: { statusId: 2 },
        },{ transaction });
        let totalArray = {
            allCanclledOrders: allCanclledOrders,
            allDeliveredOrders: allDeliveredOrders,
            allInTransitOrders: allInTransitOrders,
            allPendingOrders: allPendingOrders,
            allRefundOrders: allRefundOrders,
            allVerifiedOrders: allVerifiedOrders,
        };

        transaction.commit();
        return res.status(200).json(totalArray);
    } catch (e) {
        transaction.rollback();
        return res.status(500).send(err);
    }
}
//Cancelled Orders
async function allCanclledOrders(req, res) {

    const transaction = await db.transaction();

    try {
      let allCanclledOrders = await Orders.count({
        where: { statusId: 3 },
      },{ transaction });

      transaction.commit();
      return res.status(200).json(allCanclledOrders);
    } catch (e) {
      transaction.rollback();  
      return res.status(500).send(err);
    }
  }

//Delivered Orders
async function allDeliveredOrders(req, res) {

    const transaction = await db.transaction();

    try {
      let allDeliveredOrders = await Orders.count({
        where: { statusId: 5 },
      },{ transaction });

      transaction.commit();
      return res.status(200).json(allDeliveredOrders);
    } catch (e) {
      transaction.rollback();  
      return res.status(500).send(err);
    }
  }

//InTransit Orders
async function allInTransitOrders(req, res) {

    const transaction = await db.transaction();

    try {
      let allInTransitOrders = await Orders.count({
        where: { statusId: 6 },
      },{ transaction });

      transaction.commit();
      return res.status(200).json(allInTransitOrders);
    } catch (e) {
      transaction.rollback(); 
      return res.status(500).send(err);
    }
  }

//Pending Orders
async function allPendingOrders(req, res) {

    const transaction = await db.transaction();

    try {
      let allPendingOrders = await Orders.count({
        where: { statusId: 1 },
      },{ transaction });
      transaction.commit();
      return res.status(200).json(allPendingOrders);
    } catch (e) {
      transaction.rollback(); 
      res.status(500).send(err);
    }
  }
  

//Refund Orders
async function allRefundOrders(req, res) {

    const transaction = await db.transaction();

    try {
      let allRefundOrders = await Orders.count({
        where: { statusId: 4 },
      },{ transaction });
      transaction.commit();
      return res.status(200).json(allRefundOrders);
    } catch (e) {
      transaction.rollback(); 
      return res.status(500).send(err);
    }
  }

//Verified Orders
async function allVerifiedOrders(req, res) {

  const transaction = await db.transaction();

  try {
    let allVerifiedOrders = await Orders.count({
      where: { statusId: 2 },
    },{ transaction });

    transaction.commit();
    return res.status(200).json(allVerifiedOrders);
  } catch (e) {
    transaction.rollback(); 
    return res.status(500).send(err);
  }
}

//Top Ten Latest Products
async function latestProducts(req, res) {
  const transaction = await db.transaction();

  try {
    let latestProducts = await Products.findAll({
      order: [["id", "DESC"]],
      limit: 10,
    },{transaction});

    transaction.commit();
    return res.status(200).json(latestProducts);
  } catch (err) {
    transaction.rollback();
    return res.status(500).send(err);
  }
}

//Top Ten Latest Customers
async function latestCustomers(req, res) {

    const transaction = await db.transaction();
    try {
      let latestCustomers = await Customers.findAll({
        order: [["id", "DESC"]],
        limit: 10,
      }, {transaction});

      transaction.commit();
      res.status(200).send(latestCustomers);
    } catch (err) {
      transaction.rollback();
      return res.status(500).send(err);
    }
  }

//Top Ten Latest Reviews
async function latestReviews(req, res) {

    const transaction = await db.transaction();
    try {
      let latestReviews = await Reviews.findAll({
        order: [["id", "DESC"]],
        limit: 10,
      }, {transaction});

      transaction.commit();
      res.status(200).send(latestReviews);
    } catch (err) {
      transaction.rollback();
      return res.status(500).send(err);
    }
  }

//Top Ten Latest Reviews
async function latestAnswerQuestion(req, res) {

    const transaction = await db.transaction();
    try {
      let latestAnswerQuestion = await AnswerQuestion.findAll({
        order: [["id", "DESC"]],
        limit: 10,
      }, {transaction});

      transaction.commit();
      res.status(200).send(latestAnswerQuestion);
    } catch (err) {
      transaction.rollback();
      return res.status(500).send(err);
    }
  }

module.exports = {
    allTotal,
  allOrders,
  allProducts,
  allCustomers,
  allBrands,
  allMenus,
  allCollections,
  allCanclledOrders,
  allDeliveredOrders,
  allInTransitOrders,
  allPendingOrders,
  allRefundOrders,
  allVerifiedOrders,
  latestProducts,
  latestCustomers,
  latestReviews,
  latestAnswerQuestion,
    orderDetails
};
