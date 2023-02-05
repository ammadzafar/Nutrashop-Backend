const models = require("../../../models/")
const {validationResult} = require("express-validator");
const slug = require("slug");
const {isSeen} = require("./StatusUpdateController");
const Order = models.orders
const Customer = models.customers
const db = models.sequelize

exports.UpdateStatus = (req,res) => {

    const id = req.params.id
    var pOrder = {}
    pOrder = {
        statusId : req.body.statusId
    }
    console.log(pOrder)
    Order.update(pOrder,{
        where:{id:id}
    }).then((num) => {
        console.log(num)
        if (num == 1) {

            res.send({
                message: "Order has Benn Updated.",
                pOrder:pOrder
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: "Error updating pending order with id=" + id
            });
        });
}


exports.allUnread = async (req,res)=>{

    try{
        let allUnread = await Order.findAll({
            where:{isSeen:0}
        })
        allUnread = allUnread.length
        console.log(allUnread)
        return res.status(200).send({allUnread, message:allUnread+" Unread Messages"})
    }catch (e) {
        res.status(500).send({
            message:
                e.message || 'err unable to fetch all unRead Orders'
        })
    }
}

exports.isSeen = async (req, res) => {

    const transaction = await db.transaction();
    const orderId = req.params.id;
    try {

        let updatedIsSeenOrder = await Order.update({isSeen: 1},{
            where:{id:orderId}
        })
        await transaction.commit();

        console.log(updatedIsSeenOrder)
        return res.send({
            message: " successfully change to seen."
        });
    } catch (err) {
        await transaction.rollback();
        return res.status(500).send(err);
    }
};
