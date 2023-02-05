const models = require("../../models")
const Images = models.productImages
const Product = models.products;
const {Op} = require ('sequelize')


// Retrieve all Brands from the database.
exports.searchProducts = (req, res) => {

    const search = req.query.search;
    Product.findAll({
        where:
            {
                [Op.or]: [
                    { [Op.and]:[{name: {[Op.like]: `%${search}%`} },{visibility:true}] },
                    { [Op.and]:[{ description: { [Op.like]: `%${search}%` } },{visibility:true}] },
                    { [Op.and]:[{ seo_keywords: { [Op.like]: `%${search}%` } },{visibility:true}] },
                    { [Op.and]:[{ seo_description: { [Op.like]: `%${search}%` } },{visibility:true}] },
                ]
            },
        include: {model: Images, as: 'images'},
        order: [
            ['id', 'DESC'],
        ],
        // limit:10,
        attributes:['name','price','slug']
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
