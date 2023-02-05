const models = require('../../models');
const Discount = models.coupondiscount;
const Product = models.products;
const CouponDiscountProducts = models.couponDiscountProducts;


async function findAll(req,res){
    try {
        let allCoupons = await Discount.findAll()
        if(!allCoupons){
            res.status(500).send({
                message:"unable to find all Discount Coupons"
            })
        }
        res.status(200).send(allCoupons)
    }catch (e) {
        res.status(500).send(e)
        console.log(e)
    }
}
async function findOne(req,res){
    const id = req.params.id
    try {
        let allCoupons = await Discount.findOne({
            where:{id:id},
            include:['product']
        })
        if(!allCoupons){
            res.status(500).send({
                message:"unable to find all Discount Coupons"
            })
        }
        return res.status(200).send(allCoupons)
    }catch (error) {
        res.status(500).send({
            message: error + "unable to get The Coupon"
        })
    }
}


async function create(req, res) {
    const products = req.body.productList
    // console.log("products",products);
    let discount = {
        discountName : req.body.discountName,
        discount : req.body.discount,
        expirationDate : req.body.expirationDate,
    }
    try {
        let newCoupon = await Discount.create(discount)
        if (!newCoupon) {
            res.status(500).send({
                message:" unable to add your answer"
            })
        }
        let data = await newCoupon.addProduct(products)
        return res.status(200).send(newCoupon)

    } catch (error) {
        res.status(500).send({ 
            message: res.send(error) + "unable to create The Coupon"
        })
    }
}
async function update(req, res) {
    const id = req.params.id
    const products = req.body.productList
    let discount = {
        discountName : req.body.discountName,
        discount : req.body.discount,
        expirationDate : req.body.expirationDate,
    }
    try {
        let deletedRelations =  await CouponDiscountProducts.destroy({where:{discountCouponId:id}})
        let newCoupon = await Discount.update(discount,{where:{id:id}})
        let coupon = await Discount.findByPk(id)
            let data = await coupon.addProduct(products)
        console.log(data,"=======")
        if(!data){
            return res.status(500).send({
                message: res.send(error) + "unable to create The Coupon"
            })
        }
        return res.status(200).send(coupon)

    } catch (error) {
        res.status(500).send({
            message: res.send(error) + "unable to create The Coupon"
        })
    }
}
async function deleteOne(req, res){
    const discountCouponId = req.params.id
    try{
        let deletedRelations =  await CouponDiscountProducts.destroy({where:{discountCouponId:discountCouponId}})
        let deletedCoupon = await Discount.destroy({where:{id:discountCouponId}})
        if(deletedCoupon !== 1){
            res.status(500).send({
                message: res.send(error) + "unable to delete The Coupon"
            })
        }
        return res.status(200).send({message:'deleted Successfully',
        deletedCoupon})
    }catch (error) {
        console.log(error,'===================')
        res.status(500).send({
            message: res.send(error) + "Something went wrong"
        })
    }
}

module.exports = {
    create,findAll,findOne, update,deleteOne
}