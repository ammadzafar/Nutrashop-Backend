const models = require('../../models')
const slug = require('slug')
const Customer = models.customers
const Addresses = models.address
const {validationResult} = require('express-validator')


exports.create = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    const customer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
    };

    Customer.create(customer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating Customer."
            });
        });
};

exports.findAll = (req, res) => {
    Customer.findAll({
        order: [
            ['id', 'DESC'],
        ],
        include: [{model:Addresses }],
        attributes: ['id', 'firstName', 'lastName', 'phone', 'email', 'createdAt']
    })
        .then(data => {
            res.send(data)
        }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating Customer."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Customer.findOne({
            where: {
                id: id
            },
        include: [{model:Addresses }],
        },
    )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Customer with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Customer.destroy({
        where: {id: id}
    })

        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer  was deleted successfully"
                })
            } else {
                res.send({
                    message: "customer cannot be deleted"
                })
            }
        }).catch(err => {
        res.status(500).send({
            message: "this customer cannot be deleted by id=" + id
        })
    })
};

exports.update = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    const id = req.params.id;
    var customer = {}
    customer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
    }
    let address = {
        address:req.body.address,
        label:req.body.address,
        state:req.body.province,
        city:req.body.city,
        postal_code:req.body.postal_code,
    }
    await Addresses.update(address,{where:{id:id}})
    Customer.update(customer, {
        where: {id: id},
    }).then((num) => {
        if (num == 1) {
            res.send({
                message: "Customer was updated successfully.",
            });
        } else {
            res.send({
                message: `Cannot update`
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: "Error Customer update with id=" + id
            });
        });

}
