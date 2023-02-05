
const models = require("../../../models")
const Wishlist = models.wishlist;
const Product = models.products;
const { Op } = require("sequelize");

async function addToWishlist(req, res) {
    try {
        const wishlist = await Wishlist.create({
            customerId:req.body.customerId,
            productId:req.body.productId,
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            attributes: ['customerId', 'productId']
        })
        res.status(200).send({
        wishlist
        });
    } catch (e) {
        res.status(401).send({e});
    }


}
async function removeFromWishlist(req, res) {
    let productId=req.body.productId
    let customerId=req.body.customerId
    try {
        await Wishlist.destroy({ where:{
                customerId:customerId,
                productId:productId,
            }

        })
        res.status(200).send({
           message:'Item removed from your wishlist',
            productId

        });
    } catch (e) {
        res.status(401).send({e});
    }


}
async function products(req, res) {
    try {
       const products= await Product.findAll({ where: {
                id: {
                    [Op.in]: req.body.productIds
                }
            },
           include:{all:true}

        })
        res.status(200).send({
            products
        });
    } catch (e) {
        res.status(401).send({e});
    }


}
module.exports = {
    addToWishlist,
    removeFromWishlist,
    products
}
