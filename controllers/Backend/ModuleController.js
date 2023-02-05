const models = require("../../models")
const Module = models.modules;


exports.findAll = (req, res) => {

    Module.findAll({
        order: [
            ['id', 'DESC'],
        ],
        attributes: ['id', 'name', 'slug','icon','active']
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

