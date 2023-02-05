const axios=require('axios')

const models = require("../../../models/")
const Order = models.orders
const Customer = models.customers
const OrderVariants = models.orderVariants
const Product = models.products
const Status = models.statuses
const Images = models.productImages


async function Verified(req,res){
    Order.findAll({
        include: [{model: Customer, as: 'customer'},
            {model:Status},
            {model:OrderVariants,include:[{model: models.variants,
                    include:[{model:Product, include:{model:Images,as:"images"}}]}]}
        ],
        order: [
            ['id', 'DESC'],
        ],
        where:{statusId:2}
    }).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message:
                err.message || 'err is very bad'
        })
    })
}
async function OneVerified  (req,res)  {
    const id = req.params.id;
    Order.findOne({


        include: [{model: Customer, as: 'customer'},
            {model:Status},
            {model:OrderVariants,include:[{model: models.variants,
                    include:[{model:Product, include:{model:Images,as:"images"}}]}]}
        ],
        where:{
            id:id,
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
}
async function booking(req,res){
    try{
        const id=req.params.id
        const order= await  Order.findOne({
            include: [{model: Customer, as: 'customer'}],
            where:{
                id:id,
            }
        })
        const booking=        {
            "loginId":process.env.BOOKING_LOGIN_ID,
            "ConsigneeName":order.customer.firstName,
            "ConsigneeRefNo":order.order_no,
            "ConsigneeCellNo":order.customer.phone,
            "Address":order.address,
            "OriginCityName":"Lahore",
            "DestCityName":order.city,
            // "DestAreaId":"5",
            "ServiceTypeId":"1",
            "DeliveryTypeId":"1",
            "Pcs":"1",
            "Weight":"1",
            "Description":"Handle with care.....",
            "CodAmount":order.amount + order.dc_charges,
            "remarks":"NA",
            "ShipperAddress":"PAK Vitamins",
            "apikey":process.env.BOOKING_API_KEY
        }
        const response=await axios.post(process.env.BOOKING_BASE_PATH+"SaveBooking",booking)
        const d = {
            booking: true,
            consignment_num:response.data.CNUM
        };
        let updated_order= await Order.update(d, {
            where: {id: id}
        })
        res.send(response.data);
    }catch(e){
        res.send(e);

    }

            // res.send(data);
}
async function updateShipping(req,res){
    try{
        const id=req.params.id
        const shipping=req.params.shipping
        console.log(shipping)
        const d = {
            dc_charges: shipping,
        };
        let updated_order= await Order.update(d, {
            where: {id: id}
        })
        res.send(updated_order);
    }catch(e){
        res.send(e);

    }

            // res.send(data);
}

module.exports={
    booking,
    Verified,
    OneVerified,
    updateShipping
}