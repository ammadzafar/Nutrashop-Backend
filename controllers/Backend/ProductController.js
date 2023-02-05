const models = require("../../models")
const slug = require('slug')
const Product = models.products;
const Brand = models.brands;
const Collection = models.collections;
const Images = models.productImages;
const Variant = models.variants;
const VariantImage = models.variantImages;
const AttributeValueVariant = models.attributeValuesVariants;
const attributeProducts = models.attributeProducts;
const collectionProducts = models.collectionProducts;
const {validationResult, body} = require('express-validator');
const readXlsxFile = require("read-excel-file/node")
const fs = require("fs")
const upload = require("../../middleware/ProductImagesUpload");
const db = models.sequelize;
var async = require("async");
const {Op} = require("sequelize");
var decode = require('decode-html');

// Create and Save a new Brand
exports.create = async (req, res) => {
    // let description = decode(req.body.description);
    // description = description.replace(/&#x2F;/g, '/');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    if (req.files === undefined) {
        return res.status(422).json({errors: "File required"});
    }
    const transaction = await db.transaction();
    try {
        var images = []
        if (req.files) {
            req.files.forEach(file => {
                const object = Object.create(null);
                object.path = "products/" + file.filename
                images.push(object)
            })
        }
        let collections = null;
        if (req.body.collections) {
            collections = req.body.collections;
            collections = collections.split(',')
        }
        // let name = decode(req.body.name)
        // name = name.replace(/&#x2F;/g, '/')
        const productData = {
            name: req.body.name,
            slug: req.body.slug ? slug(req.body.slug) : slug(req.body.name),
            brandId: req.body.brand,
            description: req.body.description,
            quantity: req.body.quantity,
            sku: req.body.sku,
            price: req.body.price,
            stockStatus: req.body.stockStatus,
            visibility: req.body.visibility,
            regularPrice: req.body.regularPrice,
            seo_title: req.body.seoTitle,
            seo_description: req.body.seoDescription,
            seo_keywords: req.body.keywords,
            images: [...images],
            isPopular: req.body.isPopular,
            stock: req.body.quantity,
        };

        const product = await Product.create(productData, {include: ['images']}, transaction)
        const productCollection = await product.addCollection(collections, {transaction});
        const variantData = {
            productId:product.id,
            name: req.body.name,
            sku: req.body.sku,
            price: req.body.price,
            status: req.body.stockStatus,
            stock: req.body.quantity,
        };
        try{
            const variation = await Variant.create(variantData, {transaction})
            const varImage = await VariantImage.create({path:images[0].path,
                variantId:variation.id
            }, {transaction})
        }catch (e) {
            console.log(e)
            return res.status(500).send({e})
        }
        // const attributes = await req.body.attributes;
        // if (attributes.length) {
        //     attributes.map(async attribute => {
        //         await attributeProducts.create({attributeId: attribute, productId: product.id,})
        //     })
        // }
        // const variants = await req.body.variants;
        // if (variants.length) {
        //     variants.map(async variant => {
        //         const createdVariant = await Variant.create({
        //             productId: product.id,
        //             price: variant.price,
        //             sku: variant.sku,
        //             stock: variant.stock,
        //             status: variant.stock > 0 ? 'in_stock' : 'not_available',
        //         });
        //         await AttributeValueVariant.create({
        //             variantId: createdVariant.id,
        //             attributeValueId: variant.attributesData.value,
        //         });
        //     })
        // }
        await transaction.commit();
        return res.send(product);
    } catch (err) {
        await transaction.rollback();
        return res.status(500).json(err);
    }
};

// Retrieve all Brands from the database.
exports.findAll = (req, res) => {
    Product.findAll({
        include: [{model: Images, as: 'images'},{model:models.variants}],
        order: [['id', 'DESC'],],
        attributes: ['id', 'name', 'createdAt', 'isPopular', 'stock']
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({message: err.message || "Some error occurred while retrieving Products."});
    });
};

//Check togglePopular
exports.togglePopular = (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    var product = {}
    product = {isPopular: req.body.isPopular,};
    Product.update(product, {where: {id: id}}).then((num) => {
        if (num == 1) {
            res.send({message: "Product was updated successfully.", product: product});
        } else {
            res.send({message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`});
        }
    }).catch(err => {
        res.status(500).send({message: "Error updating Product with id=" + id});
    });
}

//Find One
exports.findOne = async (req, res) => {
    let {id} = req.params;
    Product.findOne({where: {id: id},  include:[
            {model:models.collections,as:'collections',include:{model:models.collections,as:'parentCollections'}},
            {model:Brand},{model:Images,as:"images"},
            {model:models.reviews,as:"reviews"}
        ]}).then((product) => {
        res.status(200).send(product)
    }).catch((error) => {
        res.status(500).send(error)
    })
}

exports.update = async (req, res) => {
    let {id} = req.params
    // let description = decode(req.body.description);
    // description = description.replace(/&#x2F;/g, '/')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    if (req.files === undefined) {
        res.status(422).json({errors: "File required"});
    }
    var images = []
    if (req.files) {
        req.files.forEach(file => {
            const object = Object.create(null);
            object.path = "products/" + file.filename
            object.productId = id
            images.push(object)
        })
    }
    var collections = req.body.collections;
    collections = collections.split(',')
    var removedImages = []
    if (req.body.removedImages) {
        removedImages = req.body.removedImages
        removedImages = removedImages.split(',')
    }
    // let name = decode(req.body.name)
    // name = name.replace(/&#x2F;/g, '/')
    console.log(req.body)
    const product = {
        name: req.body.name,
        slug: req.body.slug ? slug(req.body.slug) : slug(req.body.name),
        brandId: req.body.brand,
        description: req.body.description,
        quantity: req.body.quantity,
        sku: req.body.sku,
        price: req.body.price,
        stockStatus: req.body.stockStatus,
        visibility: req.body.visibility,
        regularPrice: req.body.regularPrice,
        seo_title: req.body.seoTitle,
        seo_description: req.body.seoDescription,
        seo_keywords: req.body.keywords,
        images: [...images],
        isPopular: req.body.isPopular,
    };

    Images.destroy(
        {
            where: {
                id: {
                    [Op.in]: removedImages
                }
            }
        }).then((success) => {
        Product.update(product, {
            where: {id: id},
            include: ['images']
        }).then(([success, product]) => {
            Product.findByPk(id)
                .then(data => {
                    Images.bulkCreate([...images]).then((success) => {
                        collectionProducts.destroy({
                            where: {productId: id}
                        }).then((success) => {
                            data.addCollection(collections).then(data => {
                                    res.send(data);
                                }
                            ).catch(error => {
                                res.send(error);

                            })
                        }).catch((error) => {
                            res.send(error);
                        })
                    }).catch(error => {
                        res.send(error);
                    })

                })
                .catch(err => {
                    res.status(500).send(err);
                });
        }).catch((error) => {
            res.status(500).send(error)
        })


    }).catch((error) => {
        res.status(500).send(error)

    })
}
exports.delete = async (req, res) => {
    const transaction = await db.transaction();
    try {
        const productId = await req.params.id;
        const product = await Product.findByPk(productId, {transaction});
        if (!product) {
            return res.status(404).json({message: `Product not found against ${productId}`});
        }
        const collection = await collectionProducts.destroy({where: {productId: product.id}}, transaction)
        const images = await Images.destroy({where: {productId: product.id}}, transaction)
        const banner = await models.banners.destroy({where: {productId: product.id}}, transaction)
        await attributeProducts.destroy({where: {productId: product.id}}, transaction)
        await Variant.destroy({where: {productId: product.id}}, transaction)
        await product.destroy()
        await transaction.commit();
        return res.send({message: "Product successfully deleted!"});
    } catch (err) {
        await transaction.rollback();
        return res.status(500).json(err);
    }
}

//update stock
exports.updateStock = async (req, res) => {
    const transaction = await db.transaction();
    try {
        const variantId = req.params.id;
        const variant = await Variant.findOne({where: {id: variantId}}, transaction);
        if (!variant) {
            return res.status(404).send({message: `Variant not found against ${variantId}`})
        }
        let receivedStock = parseInt(req.body.stock)
        let totalStock = await variant.stock + receivedStock;
        await Variant.update({stock: totalStock}, {where: {id: variantId}}, transaction)
        await transaction.commit();
        return res.send({message: `${req.body.stock} items successfully added, now the total stock is ${totalStock}.`})
    } catch (err) {
        await transaction.rollback();
        return res.status(500).send(err)
    }
}

//Find new Products
exports.newProducts = async (req, res) => {
    // console.lg("request======",req);
    Product.findAll({
        include: [{model: Images, as: 'images'},{model:models.variants}],
        order: [['id', 'DESC'],],
        limit: 10,
        attributes: ['id', 'name', 'createdAt', 'isPopular', 'stock']
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({message: err.message || "Some error occurred while retrieving Products."});
    });
}

