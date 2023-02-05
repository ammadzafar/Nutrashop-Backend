const models = require("../../models")
const Product = models.products;
const Reviews = models.reviews;
const Images = models.productImages
const fs = require("fs")
const { Op } = require("sequelize");


// Retrieve all Brands from the database.
exports.findAll = (req, res) => {
    Product.findAll({
        // where:{[Op.or]:[{visibility:1},{isPopular: 1}]},
        where: {
            [Op.and]: [
                {visibility:true},
                { isPopular: true }
            ]
        },
        include:[
            {model:models.collections,as:'collections',include:{model:models.collections,as:'parentCollections'}},
            {model:models.brands},{model:Images,as:"images"},
            {model:models.reviews,as:"reviews"},
            {model:models.variants,include:{model:models.variantImages,as:'variantImg'}}        ],
        // Add order conditions here....
        order: [
            ['id', 'DESC'],
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Collections."
            });
        });
};
exports.newProducts = (req, res) => {
    Product.findAll({


        include:[
            {model:models.collections,as:'collections',include:{model:models.collections,as:'parentCollections'}},
            {model:models.brands},{model:Images,as:"images"},
            {model:models.reviews,as:"reviews"},
            {model:models.variants,include:{model:models.variantImages,as:'variantImg'}}        ],
        // Add order conditions here....
        order: [
            ['id', 'DESC'],
        ],
        limit:4,

    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Collections."
            });
        });
};



