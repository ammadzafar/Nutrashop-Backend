const models = require("../../models")
const Review = models.reviews;



exports.findAll = (req, res) => {

    Review.findAll({
include:{all:true}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Products."
            });
        });
};

exports.findAllByProducts = (req, res) => {

    review = {
        productId: req.body.productId,
        
    };
    Review.findAll(review, {
        where: {productId: productId}
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

//Update Review
exports.update = (req, res) => {
    const id = req.params.id;
    var review = {
        visibility: req.body.visibility,
        };
    Review.update(review, {
        order: [
            ['id', 'DESC'],
        ],
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
exports.makeTop = (req, res) => {
    const id = req.params.id;
    var review = {
        is_top: req.body.is_top,
        };
    Review.update(review, {
        order: [
            ['id', 'DESC'],
        ],
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
