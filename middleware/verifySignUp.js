const db = require("../models");
const User = db.customers;

checkDuplicateUsernameOrEmail = (req, res, next) => {

    if (!req.body.email) {
        return res.status(422).send({
            message: "No email provided!"
        });
    }
    // Email
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! email is already in use!"
            });
            return;
        }
        next();
    });
};


const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
