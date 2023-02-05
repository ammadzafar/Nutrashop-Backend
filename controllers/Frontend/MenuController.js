const models = require("../../models")
const Menu = models.menus;
const Collection = models.collections;

const fs = require("fs")


// Retrieve all Brands from the database.
exports.findAll = (req, res) => {
    Menu.findAll({
        // Add order conditions here....
        include: [
            {model: Collection, as: 'collections', include: [
                    {model: Collection,as:'parentCollections'}
                ],
                // order:[[{ model: Collection, as: 'parentCollections' }, 'name', 'ASC']],
            },{model:Collection}
        ],
        order: [
            ['name','ASC'],["collections",'name','ASC'],['collections', 'parentCollections', 'name', 'ASC']
        ],
        limit:9,
        attributes: ['id','slug', 'name','createdAt']
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



