const models = require("../../models")
const slug=require('slug')
const { Op } = require("sequelize");
const Collection = models.collections;
const ChildCollection = models.collectionChildCollections;
const {validationResult} = require('express-validator');
const fs = require("fs")
const decode = require("decode-html");
// Create and Save a new Collection
exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    let name = decode(req.body.name)
    name = name.replace(/&#x2F;/g, '/')
    // Create a Tutorial
    const collection = {
        name: name,
        collectionId: req.body.collectionId?req.body.collectionId:null,
        description: req.body.description,
        visibility: req.body.visibility,
        slug:slug(name),
        seo_title: req.body.seo_title,
        seo_description: req.body.seo_description,
        seo_keywords: req.body.seo_keywords,
        image: req.file?"collections/" + req.file.filename:null,
        isPopular:req.body.isPopular,
    };
    // Save Brand in the database
    try{
        const newCollection = await Collection.create(collection)
        if(!newCollection){
            res.status(500).send({
                message: "An error Occurred while Collection"
            });
        }
        if (req.body.collectionIds !== undefined && req.body.collectionIds.length !== 0 ) {
            const allCollectionIds = req.body.collectionIds.split(',');
            allCollectionIds.map(async collId => {
                try{
                    await ChildCollection.create({ parentCollectionId: newCollection.id,childCollectionId: collId,})
                }catch (e) {
                    console.log(e)
                    return e
                }
            })
        }
        return  res.status(200).send({
            newCollection,
            message: "Collection Created Successfully"
        });
    }catch (e) {
        return  res.status(500).send({
            error:e,
            message: "Unable to create Collection"
        });
    }
};

// Retrieve all Collections from the database.
exports.findAll = async (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    await Collection.findAll({
        // Add order conditions here....
        include: [{model:Collection,as:'parentCollections'},
            ],
        attributes: ['id','collectionId', 'name', 'image','createdAt','isPopular'],
        order: [
            ['id', 'DESC'], ['parentCollections', 'name', 'ASC']
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Collections."
            });
        });
};

//Retrieve Single Brand By Id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    await Collection.findOne({where: {id:id},
        include: [{model:Collection,
            as:'parentCollections'
    }],
        order:[['parentCollections','name', 'ASC']]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Collection with id=" + id
            });
        });
};

//Update Collection
exports.update = async (req, res) => {
    const id = req.params.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    var collection = {}
    let name = decode(req.body.name)
    name = name.replace(/&#x2F;/g, '/')
        collection = {
            name: name,
            description: req.body.description,
            visibility: req.body.visibility,
            slug: slug(name),
            seo_title: req.body.seo_title,
            seo_description: req.body.seo_description,
            seo_keywords: req.body.seo_keywords,
            isPopular: req.body.isPopular,
            collectionId: req.body.collectionId,
            image: req.file?"collections/" + req.file.filename:null,
    }
    try {
        const allData = await ChildCollection.findAll({where:{[Op.or]:[{parentCollectionId: id},{childCollectionId:id}]}})
        console.log(allData)
        if(allData.length !== 0){
            try{const deleted = await ChildCollection.destroy(
                {where:{[Op.or]:[{parentCollectionId: id},{childCollectionId:id}]}}
            )
                console.log(deleted)
            }catch (e){
                return res.status(500).send({message:"Cannot delete Children"+e})
            }
        }
        const collectionToUpdate = await Collection.findByPk(id)
        if(!collectionToUpdate) {
            return res.status(500).send({
                message: "Unable to find Collection with id=" + id
            });
        }
        if (req.body.collectionIds !== undefined && req.body.collectionIds.length !==0 ) {
            const allCollectionIds = req.body.collectionIds.split(',');
            allCollectionIds.map(async collId => {
                try{
                    await ChildCollection.create({ parentCollectionId: id,childCollectionId: collId,})
                    console.log("success"+ collId)
                }catch (e) {
                    console.log(e+"asdafa")
                    return e
                }
            })
        }
        const updatedCollection = await Collection.update(collection, {
            where: {id: id}
        })
        if(!updatedCollection){
            res.status(500).send({
                message: "Error"
            });
        }
        const latestCollections = await Collection.findOne({where: {id:id},include: [{model:Collection,as:'parentCollections'}],})
        return  res.status(200).send({
            latestCollections,
            message: "Collection with id=" + id +" is Updated Successfully"
        });
    }catch (e) {
        res.status(500).send({
            e,
            message: "Error updating Collection with id=" + id
        });
    }
}
// getting all Parent Collections
exports.findAllParents = async (req, res)=>{
    try {
        const allParentCollections = await Collection.findAll({where:{collectionId:null}})
        if( ! allParentCollections ) {
            res.status(500).send({
                message: "No Parent Collections Found"
            });
        }
        return res.status(200).send({
            allParentCollections,
            message: "All Parent Collections Found Successfully"
        });
    }catch (e) {
        res.status(500).send({
            e,
            message: "Unable to find Parent Collections"
        });
    }
}
// updatePopular
exports.updatePopular = (req, res) => {
    const id = req.params.id;

    Collection.update({isPopular: req.body.isPopular}, {
        where: {id: id}
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Collection was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update collection with id=${id}. Maybe Collection was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({err,
                message: "Error updating Collection with id=" + id
            });
        });
}
//Delete Collection
exports.delete= async (req,res)=>{
    const id = req.params.id;
        try{
            const delCollection = await Collection.destroy({where: {id: id}})
            if(!delCollection){
                return res.status(500).send({message:`Unable to delete Collection with Id =${id}`})
            }
            return res.status(200).send({message:`Collection deleted Successfully with Id =${id}`})
        }catch (e) {
            console.log(e)
            res.status(500).send({message:"unable to delete Collection because have relations",e})
        }
}


exports.testingDataValue = async (req, res) => {
    try{
        console.log(req.body.id)
        console.log(req.body.ids)
        console.log('asd-----------------------------------------------------------------------')
       const abc = await ChildCollection.create({parentCollectionId: req.body.id, childCollectionId: req.body.ids,})
        console.log(abc)
        if(!abc){
            return res.status(500).send({e})
        }
        return res.status(200).send({abc})
    }catch (e) {
        return res.status(500).send({e})
    }
}