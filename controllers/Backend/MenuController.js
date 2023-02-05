const models = require("../../models")
const slug = require('slug')
const Menu = models.menus;
const {validationResult} = require('express-validator');
const decode = require("decode-html");

// Create and Save a new Attribute
exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    if (req.body.collections) {
        var collections = req.body.collections;
        collections = collections.split(',')
    }
    const decode = require("decode-html");
    let name = decode(req.body.name)
    name = name.replace(/&#x2F;/g, '/')
    const menu = {
        name: name,
        slug: slug(req.body.name),
        menuCollection: req.body.menuCollection,
    };
    Menu.create(menu)
        .then(menu => {
            if (menu) {
                menu.addCollection(collections).then(data => {
                        res.send(menu);
                    }
                ).catch(error => {
                    res.send(error);
                })
            } else {
                res.send(menu);
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// Retrieve all Menus from the database.
exports.findAll = (req, res) => {
    Menu.findAll({
        // Add order conditions here....
        include: [
            {model: models.collections, as: 'collections', include: [
                    {model: models.collections,as:'parentCollections'}
                ]},
            {model:models.collections}
        ],
        order: [
            ['id', 'DESC'],['collections','name','ASC']
        ],
        attributes: ['id', 'name','menuCollection', 'createdAt']
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
//Retrieve Single Menu By Id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Menu.findOne({
        where: {id: id},
        include: [
            {model: models.collections, as: 'collections', include: [
                    {model: models.collections,as:'parentCollections'}
                ]},
            {model:models.collections}
        ],
        order:[['collections','name', 'ASC']],
        attributes: ['id', 'name','menuCollection', 'createdAt']
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Menu with id=" + id
            });
        });
};
