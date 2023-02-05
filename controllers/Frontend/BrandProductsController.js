const models = require("../../models")
const Brand = models.brands;
const Products = models.products;
const Reviews = models.reviews;
const Images = models.productImages;
const Collections = models.collections;
const fs = require("fs")



//Retrieve Single Brand By Id
exports.findOne = (req, res) => {
    const slug = req.params.slug;
    console.log(slug)
    Brand.findOne({ where: { slug: slug },
            include:[
                {model:Products,as:"products",where:{"visibility":1},include:[
                    {model:Collections,as:"collections"},
                        {model:Reviews,as:"reviews"},
                        {model:Images,as:"images"},
                        {model:models.variants,include:{model:models.variantImages,as:'variantImg'}}                    ]}
            ]
        },
    )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Brand with id=" + slug
            });
        });
};


