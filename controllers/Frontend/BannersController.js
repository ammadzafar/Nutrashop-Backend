const models = require("../../models")
const Banners = models.banners;
const Products = models.products
const Collections = models.collections

exports.findAll = (req, res) => {
    Banners.findAll({
        include: [{model:Products},{model:Collections}],
        where:{'isFeatured':1},
        order: [
            ['id', 'DESC'],
        ],
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving BannersController."
            });
        });
};
