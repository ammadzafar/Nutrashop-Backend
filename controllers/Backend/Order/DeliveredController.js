const models = require("../../../models/")
const Order = models.orders
const Customer = models.customers
const OrderVariants = models.orderVariants
const Product = models.products
const Status = models.statuses
const Images = models.productImages
exports.Delivered=(req,res)=>{

    Order.findAll({
        include: [{model: Customer, as: 'customer'},
            {model:Status},
            {model:OrderVariants,include:[{model: models.variants,
                    include:[{model:Product, include:{model:Images,as:"images"}}]}]}
        ],
        order: [
            ['id', 'DESC'],
        ],
        where:{statusId:5}
    }).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message:
                err.message || 'err is very bad'
        })
    })
}
exports.OneDelivered = (req,res) => {
    const id = req.params.id;
    Order.findOne({


        include: [{model: Customer, as: 'customer'},
            {model:Status},
            {model:OrderVariants,include:[{model: models.variants,
                    include:[{model:Product, include:{model:Images,as:"images"}}]}]}
        ],
        where:{
            id:id,
            statusId:5
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}
