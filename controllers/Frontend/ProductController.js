const models = require("../../models")
const Product = models.products;
const Brand = models.brands;
const Customer = models.customers;
const Reviews = models.reviews;
const Images = models.productImages;
const Collections = models.collections;
const fs = require("fs")

// Retrieve all Brands from the database.
exports.fineOne = (req, res) => {
    const slug = req.params.slug;
    Product.findOne({
        where: {slug: slug},
        order:[['reviews','id','DESC']],
        include: [
            {model: Collections, as: "collections"},
            {model:Brand},
            {model: Reviews, as: "reviews",include:{model:Customer}},
            {model: Images, as: "images"},
            {model:models.variants,include:{model:models.variantImages,as:'variantImg'}}
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};



