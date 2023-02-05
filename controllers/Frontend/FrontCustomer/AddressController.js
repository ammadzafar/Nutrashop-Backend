const models = require("../../../models")
const Customer = models.customers
const Address = models.address
const Orders = models.orders
const db = models.sequelize;
const {Op} = require("sequelize");

exports.store = async (req, res) => {
    console.log(req.body.label)
    const transaction = await db.transaction();

    try {
        const customerId = req.params.id;
        const customer = await Customer.findOne({
            where: {
                id: customerId
            }
        }, transaction)

        if (!customer) {
            return res.status(404).send({
                message: `Customer not found against ${customerId}`
            });
        }
        let optionLabel = "";

        if(req.body.label === undefined ){
            optionLabel = req.body.address
        }else{
            optionLabel = req.body.label
            const addresses = await Address.findAll({
                where: {
                    customerId: customerId,
                    label: optionLabel
                }
            })
            if (addresses.length) {
                return res.status(422).send({
                    message: `Address with label '${req.body.label}' already exists.`
                });
            }
        }

        await customer.createAddress({
            label: optionLabel,
            state: req.body.state,
            city: req.body.city,
            postal_code: req.body.postal_code,
            address: req.body.address,
        }, transaction);


        await transaction.commit();
        return res.send({
            message: `Address successfully added for ${customer.firstName}.`
        });

    } catch (err) {
        res.status(500).send(err);
        await transaction.rollback();
    }
}

exports.update = async (req, res) => {

    const transaction = await db.transaction();

    try {
        const addressId = req.params.id;

        const address = await Address.findOne({
            where: {
                id: addressId
            }
        }, transaction)

        if (!address) {
            return res.status(404).send({
                message: `Address not found against ${addressId}`
            });
        }

        const customer = await address.getCustomer()

        const addresses = await Address.findAll({
            where: {
                id: {
                    [Op.ne]: addressId,
                },
                customerId: customer.id,
                label: req.body.label
            }
        })

        if (addresses.length) {
            return res.status(422).send({
                message: `Address '${req.body.label}' already exists.`
            });
        }

        await address.update({
            label: req.body.label,
            state: req.body.state,
            city: req.body.city,
            postal_code: req.body.postal_code,
            address: req.body.address,
        }, transaction);

        await transaction.commit();

        return res.send({
            message: `Address successfully updated.`
        });

    } catch (err) {
        res.status(500).send(err);
        await transaction.rollback(no);
    }
}

exports.getCustomerAddresses = async (req, res) => {

    const transaction = await db.transaction();

    try {
        const customerId = req.params.id;

        const customer = await Customer.findOne({
            where: {
                id: customerId
            },
            limit:10,
        }, transaction)

        if (!customer) {
            return res.status(404).send({
                message: `Customer not found against ${customerId}`
            });
        }

        const customerAddresses = await customer.getAddresses();

        await transaction.commit();

        return res.send({
            addresses: customerAddresses
        });

    } catch (err) {
        res.status(500).send(err);
        await transaction.rollback();
    }
}

exports.getSingleCustomerAddresses = async (req, res) => {

    const transaction = await db.transaction();

    try {
        const customerId = req.params.id;
        const addressId = req.params.addressId;

        const customer = await Customer.findOne({
            where: {
                id: customerId
            }
        }, transaction)

        if (!customer) {
            return res.status(404).send({
                message: `Customer not found against ${customerId}`
            });
        }

        const customerAddress = await Address.findOne({
            where:{id:addressId}
        });

        await transaction.commit();

        return res.send({
            addresses: customerAddress
        });

    } catch (err) {
        res.status(500).send(err);
        await transaction.rollback();
    }
}