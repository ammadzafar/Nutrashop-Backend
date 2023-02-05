const models = require("../../models")
const Product = models.products;
const slug = require('slug')
const Attribute = models.attributes;
const AttributeValue = models.attributeValues;
const AttributeProducts = models.attributeProducts;
const {validationResult} = require('express-validator');
const fs = require("fs")
const db = models.sequelize;
// Create and Save a new attribute
exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    const transaction = await db.transaction();

    try {
        const attribute = await Attribute.create({
            name: req.body.name,
            slug: slug(req.body.name),
        }, transaction)

        const values = req.body.values.split(',');

        values.map( value => {
             AttributeValue.create({
                name: value,
                slug: slug(value),
                attributeId: attribute.id
            }).then(success => {console.log(success)}).catch(error => {console.log(error)})
        })

        await transaction.commit();

        return res.send({
            data: {attribute, values},
            message: attribute.name + " successfully created."
        });
    } catch (err) {
        await transaction.rollback();
        return res.status(500).send(err);
    }
};

exports.createAttributeValues = async (req, res) => {
    const productId = req.body.productId
    const attributesIdArray = req.body.attributesIdArray
    const attributesValues = req.body.data.replace(/&quot;/g, '"')
    let system = {}

    const test1 = JSON.parse(attributesValues)
    try {
        const allAttValuesData = []
        const allAttValuesError = []
        const test2 = test1.map(async child => {
            console.log(child[0].attValue.map(val=>val))
            const ourData = await AttributeProducts.create({attributeId: child[0].attKey, productId})
            const attValues = child[0].attValue.map(value => {
                let tempSlug = slug(value)
                AttributeValue.create({
                    "attributeId": child[0].attKey, "name": value, "slug": tempSlug
                }).then(data=>{
                    console.log(data)
                    allAttValuesData.push(data)
                    }
                ).catch(error=>{
                    console.log(error)
                    allAttValuesError.push(error)
                })
            })
            return system = {ourData, attValues}
        })
        console.log(allAttValuesError)
        console.log(allAttValuesData)
        return res.status(200).send({
            test2,
            allAttValuesData
            // message: "success"
        });
    } catch (e) {
        res.status(500).send({e})
    }

}
// All attributes
exports.findAll = async (req, res) => {

    const transaction = await db.transaction();

    try {
        const attributes = await Attribute.findAll({
            include: {
                model: AttributeValue,
                as: 'values',
                attributes: ['id', 'name', 'createdAt', 'updatedAt']
            }
        })

        await transaction.commit();
        return res.send(attributes);
    } catch (err) {
        await transaction.rollback();
        return res.status(500).send(err);
    }
};

// Single attribute
exports.findOne = async (req, res) => {

    const transaction = await db.transaction();

    try {
        const attributeId = req.params.id;
        const attribute = await Attribute.findByPk(attributeId, {
            include: {
                model: AttributeValue,
                as: 'values',
                attributes: ['id', 'name', 'createdAt', 'updatedAt']
            }
        }, transaction);

        if (!attribute) {
            return res.status(404).send({
                message: `Attribute not found against ${attributeId}`
            });
        }

        await transaction.commit();
        return res.send(attribute);
    } catch (err) {
        await transaction.rollback();
        return res.status(500).send(err);
    }
};

// Update Attribute
exports.update = async (req, res) => {

    const transaction = await db.transaction();

    try {
        const attributeId = await req.params.id;
        const attribute = await Attribute.findByPk(attributeId, {
            include: {
                model: AttributeValue,
                as: 'values'
            }
        });

        if (!attribute) {
            return res.status(404).send({
                message: `Attribute not found against ${attributeId}`
            });
        }

        await (attribute.values).map(async value => {
            await value.destroy({transaction})
        })

        const updatedAttribute = await attribute.update({
            name: req.body.name
        })
        const values = await req.body.values.split(',');

        await values.map(async value => {
            await AttributeValue.create({
                name: value,
                slug: slug(req.body.name),
                attributeId: attribute.id
            }, transaction)
        })

        await transaction.commit();
        return res.send({
            data: {updatedAttribute, values},
            message: 'Attribute successfully updated.'
        });
    } catch (err) {
        await transaction.rollback();
        return res.status(500).send(err);
    }
}

// Delete Attribute
exports.delete = async (req, res) => {

    const transaction = await db.transaction();

    try {

        const attributeId = req.params.id;

        const attribute = await Attribute.findByPk(attributeId, {
            transaction
        });

        if (!attribute) {
            return res.status(404).send({
                message: `Attribute not found against ${attributeId}.`
            });
        }

        await attribute.destroy({
            transaction
        });

        await transaction.commit();
        return res.send({
            message: attribute.name + ' successfully deleted.'
        });
    } catch (err) {
        await transaction.rollback();
        return res.status(500).send(err);
    }
}