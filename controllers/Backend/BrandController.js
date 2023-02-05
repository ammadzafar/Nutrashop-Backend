const models = require("../../models")
const slug=require('slug')
const Brand = models.brands;
const {validationResult} = require('express-validator');
const readXlsxFile = require("read-excel-file/node")
const fs = require("fs")
var decode = require('decode-html');
// Create and Save a new Brand
exports.create = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    if (req.file === undefined) {
        res.status(422).json({errors: "File required"});
    }
    let name = decode(req.body.name)
        name = name.replace(/&#x2F;/g, '/')
    // Create a Tutorial
    const brand = {
        name: name,
        description: req.body.description,
        slug:slug(name),
        seo_title: req.body.seo_title,
        seo_description: req.body.seo_description,
        seo_keywords: req.body.seo_keywords,
        image: "brands/" + req.file.filename,
        isPopular:req.body.isPopular,
    };
    // Save Brand in the database
    Brand.create(brand)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// Retrieve all Brands from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Brand.findAll({
        // Add order conditions here....
        order: [
            ['id', 'DESC'],
        ],
        attributes: ['id', 'name', 'image','createdAt','isPopular']
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



//Retrieve all popular brands from database
exports.findPopular = (req,res)=>{
    Brand.findAll({
        attributes:['id','name','isPopular']
    })
        .then(data=>{
            res.send(data ).console.log(data)
        }).catch(err=>{
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
        })
    })
}

//Retrieve Single Brand By Id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Brand.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Brand with id=" + id
            });
        });
};

//Update Brand
exports.update = (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    var brand = {}
    let name = decode(req.body.name)
    name = name.replace(/&#x2F;/g, '/')
    if (req.file === undefined) {
        // Create a Brand
        brand = {
            name: name,
            description: req.body.description,
            slug:slug(name),
            seo_title: req.body.seo_title,
            seo_description: req.body.seo_description,
            seo_keywords: req.body.seo_keywords,
            isPopular:req.body.isPopular,

        };
    } else {
        // Create a Brand
        brand = {
            name: name,
            description: req.body.description,
            slug:slug(name),
            seo_title: req.body.seo_title,
            seo_description: req.body.seo_description,
            seo_keywords: req.body.seo_keywords,
            image: "brands/" + req.file.filename,
            isPopular:req.body.isPopular,

        };
    }
    Brand.update(brand, {
        where: {id: id}
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Brand was updated successfully.",
                    brand:brand
                });
            } else {
                res.send({
                    message: `Cannot update Brand with id=${id}. Maybe Brand was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Brand with id=" + id
            });
        });
}

//Check togglePopular
exports.togglePopular= (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    var brand = {}

    brand={
            isPopular:req.body.isPopular,
        };


    Brand.update(brand, {
        where: {id: id}
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Brand was updated successfully.",
                    brand:brand
                });
            } else {
                res.send({
                    message: `Cannot update Brand with id=${id}. Maybe Brand was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Brand with id=" + id
            });
        });
}


//Delete Brand
exports.delete=(req,res)=>{
    const id = req.params.id;

    Brand.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Brand was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Brand with id=${id}. Maybe Brand was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Brand with id=" + id
            });
        });

}

//Import Brand

exports.import=(req,res)=>{
    try{
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }

        let path =
            __basedir + "/resources/static/assets/uploads/" + req.file.filename;

        readXlsxFile(path).then((rows) => {
            // skip header
            rows.shift();

            let brands = [];

            rows.forEach((row) => {
                const project = Brand.findOne({ where: { name: row[0] } });
                let brand = {
                    name: row[0],
                    description: row[1],
                    slug:slug(row[0])
                };

                brands.push(brand);
            });

            Brand.bulkCreate(brands)
                .then(() => {
                    res.status(200).send({
                        message: "Uploaded the file successfully: " + req.file.originalname,
                    });
                })
                .catch((error) => {
                    res.status(500).send({
                        message: "Fail to import data into database!",
                        error: error.message,
                    });
                });
        });
    }catch(error){

    }
}

