const models = require("../../models")
const Collection = models.collections;
const Brand = models.brands;
const Menu = models.menus;
const Product = models.products;
const fs = require("fs")


// Retrieve all Brands from the database.
exports.findAll = (req, res) => {
    Collection.findAll({
        include:[{model:Product,as:'products',include:[Brand]}],
        // Add order conditions here....
        where:{'isPopular':true},
        order: [
            ['id', 'DESC'],
        ],
        limit:4,
        attributes: ['id','slug', 'name', 'image','isPopular']
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



