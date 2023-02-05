const models = require("../../models")
const slug = require('slug')
const Product = models.products;
const Brand = models.brands;
const Collection = models.collections;
const Images = models.productImages;
const Variant = models.variants;
const AttributeValue = models.attributeValues;
const AttributeValueVariant = models.attributeValuesVariants;
const attributeProducts = models.attributeProducts;
const collectionProducts = models.collectionProducts;
const VariantImages = models.variantImages;
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
    const id = req.params.id;
    console.log(req.body.variants);
    console.log(id);
    // const transaction = await db.transaction();
    try {
        const variants = await req.body.variants;
        if (variants.length) {
            variants.map(async variant => {
                let name = decode(variant.name)
                name = name.replace(/&#x2F;/g, '/')
                const createdVariant = await Variant.create({
                    name:name,
                    productId:id,
                    price: variant.price,
                    sku: variant.sku,
                    stock: variant.stock,
                    status: variant.stock > 0 ? 'in_stock' : 'not_available',
                });
                let newVariant = {};
                newVariant = newVariant.split('/')
                console.log(newVariant);
                newVariant.map(async vari=>{
                    console.log(vari)
                    const receivedVal = await AttributeValue.findOne({
                        where: {slug:vari.slug}
                    }).then(data=>{
                        console.log(data);
                        AttributeValueVariant.create({
                            variantId: createdVariant.id,
                            attributeValueId: data.id,
                        }).catch(error=>console.log(error));
                    })
                })

            })
        }
        // await transaction.commit();
        return res.send(variants);
    } catch (err) {
        // await transaction.rollback();
        return res.status(500).json(err);
    }
};

exports.createImage = async(req,res)=>{
    try {
        let allProducts = await Product.findAll({
            include:[{model:Variant,include:{model:VariantImages, as :'variantImg'}}, {model:Images,as:"images"}]
        })
        let ourData = [];
        allProducts.map(product=>{
            ourData.push(VariantImages.create({
                variantId:product.Variants[0].id,
                path:product.images[0].path
            }).then(success=>{
                console.log(success);
            }).catch(error=>{
                console.log(error)
            }))
        })
        res.status(200).send(allProducts)
    }catch (e) {
        res.status(500).send(e.message);
    }
}

exports.edit = async(req, res)=>{
    if (req.files === undefined) {
        res.status(422).json({errors: "File required"});
    }
    let name = decode(req.body.name);
    name = name.replace(/&#x2F;/g, '/')
    const variationId = req.params.id
    var images = []
    if (req.files) {
        req.files.forEach(file => {
            const object = Object.create(null);
            object.path = "variations/" + file.filename
            object.variantId = variationId
            images.push(object)
        })
    }
    let removedImages = []
    if (req.body.removedImages) {
        removedImages = req.body.removedImages
        removedImages = removedImages.split(',')
    }

    const variantData = {
        name: name,
        sku: req.body.sku,
        price: req.body.price,
        stock: req.body.stock,
        status: req.body.stockStatus,
    };
    try{
        let editedVariant = await Variant.update(variantData,{where:{
            id:variationId
            },
        })
        if(editedVariant === 0){
            res.status(500).send({message: "unable to edit variations" })
        }
        await VariantImages.destroy({where: {id: {[Op.in]: removedImages}}})
    images.map(image=>{
        VariantImages.create({path: image.path,variantId:image.variantId},)
            .then(success=>{console.log(success)}).catch(error=>{console.log(error)})
    })
        // let updatedImages = await VariantImages.update({path: image},{where:{
        //     variantId:variationId
        //     }})
        res.status(200).send({message:"Successfully Updated Variants"+ editedVariant})
    }catch (e) {
        res.status(500).send({message: e.message || "Some error occurred while Editing the Variations."});
    }
}

exports.findAllVariantsOfProduct = async (req, res) => {
    let {id} = req.params;
    Variant.findAll({where: {productId: id},
        include:[{model: VariantImages, as: "variantImg"}],
        order: [['id', 'DESC'],],
        attributes: ['id', 'name', 'createdAt', 'stock','status']
    }).then((product) => {
        res.status(200).send(product)
    }).catch((error) => {
        res.status(500).send(error)
    })
}
exports.findOne = async (req, res) => {
    let {id} = req.params;
    Variant.findOne({where: {id: id},
        include:[{model: VariantImages, as: "variantImg"}],
        order: [['id', 'DESC'],],
        attributes: ['id', 'name', 'createdAt', 'stock','price', 'sku','status']
    }).then((product) => {
        res.status(200).send(product)
    }).catch((error) => {
        res.status(500).send(error)
    })
}

