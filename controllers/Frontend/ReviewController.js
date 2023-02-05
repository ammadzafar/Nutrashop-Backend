const models = require("../../models")
const Review = models.reviews;
const {Op} = require ('sequelize')



exports.create = (req, res) => {
    console.log(req.body)
    const review = {
        orderVariantId:req.body.orderVariantId,
        customerId: req.body.customerId,
        productId: req.body.productId,
        rating: req.body.rating,
        description: req.body.description,
        visibility: req.body.visibility,
        reviewTitle: req.body.reviewTitle
    };
    Review.create(review)
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

exports.findAll = (req, res) => {
const id = req.params.id
    review.findAll({
           where:{[Op.and]:[{productId:id},{visibility:true}]},
        include:{all:true},
        order:[['id','DESC']],
        attributes: ['orderProductId','customerId', 'productId', 'rating','description','visibility','review']
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





//Retrieve Single Review By Id
exports.findOne = (req, res) => {
    const id = req.params.id;
    review.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Review with id=" + id
            });
        });
};

//Update Review
exports.update = (req, res) => {
    const id = req.params.id;
    var review = {}

        // Create a Review
        review = {
            orderProductId:req.body.orderProductId,
            customerId: req.body.customerId,
            productId: req.body.productId,
            rating: req.body.rating,
            description: req.body.description,
            visibility: req.body.visibility,
            reviewTitle: req.body.reviewTitle

        };
    Review.update(review, {
        where: {id: id}
    })
        .then((num) => {
            console.log(num);
            if (num == 1) {
                res.send({
                    message: "Review was updated successfully.",
                    review:review
                });
            } else {
                res.send({
                    message: `Cannot update Review with id=${id}. Maybe Review was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Review with id=" + id
            });
        });
}
//Delete Review
exports.delete=(req,res)=>{
    const id = req.params.id;

    Review.destroy({
        where: { id: id }
    })
        .then(num => {
            console.log(num);
            if (num == 1) {
                res.send({
                    message: "Review was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Review with id=${id}. Maybe Review was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Review with id=" + id
            });
        });

}

//top Reviews
exports.topReviews = (req, res) => {
    console.log('REdkjsbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbkjsdbvjkdsbvskjd')
    Review.findAll({
        where:{[Op.and]:[{is_top:true},{visibility:true}]},
        include:{all:true},
        order:[['id','DESC']]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
