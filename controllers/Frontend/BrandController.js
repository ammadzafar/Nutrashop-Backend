const models = require("../../models")
const Brand = models.brands;
const fs = require("fs")
const Products = models.products

// Retrieve all Brands from the database.
exports.findAll = (req, res) => {
    Brand.findAll({
        include:[{model:Products,as:"products"}],
        // Add order conditions here....
        where:{'isPopular':true},
        order: [
            ['id', 'DESC'],
        ],
        attributes: ['id','slug', 'name', 'image','isPopular']
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




