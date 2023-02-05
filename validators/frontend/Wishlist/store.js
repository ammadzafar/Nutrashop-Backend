'use strict';

const {Joi} = require('express-validation')
const wishlistSchema = {
    body: Joi.object({
        customerId: Joi
            .required(),
        productId: Joi
            .required(),
    }),
}

module.exports = {
    wishlistSchema
}
