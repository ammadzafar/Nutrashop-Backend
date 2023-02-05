const models = require("../../models")
const Collection = models.collections;
const Brand = models.brands;
const Menu = models.menus;
const Product = models.products;
const Images = models.productImages;
const Reviews =  models.reviews;
const fs = require("fs")



//Retrieve Single Brand By Id
exports.findOne = (req, res) => {
    const slug = req.params.slug;
    Collection.findOne({ where: { slug: slug },
        // include:{ all: true }},
        include:[
            {model:Product,as:'products',where:{"visibility":1},include:[{model:Brand},{model:Images,as:"images"},
                    {model:Reviews,as:"reviews"},
                    {model:models.variants,include:{model:models.variantImages,as:'variantImg'}}]}
        ],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
};


