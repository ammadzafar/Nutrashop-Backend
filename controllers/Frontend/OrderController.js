const models = require("../../models")
const OrdersProducts = models.orderProducts
const Statuses = models.statuses
const Products = models.products
const Customer = models.customers
const Orders = models.orders
const OrderVariants = models.orderVariants

const Images = models.productImages
const Reviews = models.reviews
const fs = require("fs")
const db = models.sequelize;


exports.findAll = (req, res) => {
    const id = req.params.id
    Orders.findAll({
        where: {customerId: id},
        // include:{all:true},
        order: [
            ['id', 'DESC'],
        ],
        include: [
            {model: Customer, as: 'customer'},
            {model: Statuses},
            {model:OrderVariants,include:[{model: models.variants,
                    include:[{model:Products ,include:
                            [{model: Images, as: "images"}, {model: Reviews, as: "reviews"}]}
                        ,{model:models.variantImages,as:'variantImg'}]}]}
        ],
    })
        .then(data => {
            res
                .send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send(err)
        });
};
exports.findOneOrder = (req, res) => {
    const id = req.params.id
    Orders.findOne({
        where: {id: id},
        include: [
            {model: Customer, as: 'customer'},
            {model: Statuses},
            // {
            //     model: OrdersProducts, include: [
            //         {
            //             model: Products, include:
            //                 [{model: Images, as: "images"}, {model: Reviews, as: "reviews"}]
            //         },
            //         {model: Reviews}]
            // },
            {model:OrderVariants,include:[{model: models.variants,
                    include:[{model:Products ,include:
                            [{model: Images, as: "images"}, {model: Reviews, as: "reviews"}]}
                    ,{model:models.variantImages,as:'variantImg'}]}]}
        ],
    })
        .then(data => {
            res
                .send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send(err)
        });
};

exports.paymentCB = async (req, res) => {

    const transaction = await db.transaction();

    try {
        const order_no = req.params.id;
        const order = await Orders.findOne({
            where: {
                order_no: order_no
            }
        }, transaction)

        if (!order) {
            res.status(404).send({
                message: `Order not found against ${order_no}`
            });
        }
        let success = req.body.success === "false" ? false :  true
        let paymentDetails = {};
            console.log(success)
        if (success) {
            paymentDetails = {
                qisstpayOrderId: req.body.qisstpayOrderId,
                paymentStatus: 'paid'
            }
        } else {
            paymentDetails = {
                qisstpayOrderId: null,
                paymentStatus: 'unpaid',
                type: 'cash_on_delivery'
            }
        }

        await Orders.update(paymentDetails, {
            where: {
                order_no: order_no
            }
        }, transaction);

        res.send({
            message: "Order successfully updated."
        });

        await transaction.commit();
    } catch (err) {
        console.log(err)
        await transaction.rollback();
    }
}

exports.markPaymentStatus = async (req, res) => {

    const transaction = await db.transaction();

    try {
        const orderId = req.params.id;
        const order = await Orders.findOne({
            where: {
                id: orderId
            }
        }, transaction)

        if (!order) {
            res.status(404).send({
                message: `Order not found against ${orderId}`
            });
        }

        let paymentStatus = order.paymentStatus === 'paid' ? 'unpaid' : 'paid';

        await Orders.update({
            paymentStatus: paymentStatus,
        }, {
            where: {
                id: orderId
            }
        }, transaction);

        res.send({
            message: `Order successfully updated. Payment status: ${paymentStatus}.`
        });

        await transaction.commit();
    } catch (err) {
        console.log(err)
        await transaction.rollback();
    }
}
