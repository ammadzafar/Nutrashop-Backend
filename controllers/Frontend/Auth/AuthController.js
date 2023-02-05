const db = require("../../../models");
const config = require("../../../config/auth.config");

const models = require("../../../models")
const User = models.customers;
const Product = models.products;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

async function signup  (req, res)  {
    // Save User to Database
    if (!req.body.password) {
        return res.status(422).send({
            message: "No password provided!"
        });
    }
    if (!req.body.firstName) {
        return res.status(422).send({
            message: "No fist name provided!"
        });
    }
    if (!req.body.lastName) {
        return res.status(422).send({
            message: "No last name provided!"
        });
    }
    let user=await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    },{
        include: {model:Product,as:"wishlist"}
    })
    user = await User.findOne(
        {
            where: {
                id: user.id
            },
            include: {model:Product,as:"wishlist"}
        },
    )
            var token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            res.status(200).send({
                id: user.id,
                user: user,
                email: user.email,
                accessToken: token
            });

}

async function signin(req, res) {
    try {
        const user = await User.findOne(
            {
                where: {
                    email: req.body.email
                },
                include: {model:Product,as:"wishlist"}
            },
        )
        if (!user) {
            return res.status(404).send({message: "User Not found."});
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        var token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            id: user.id,
            user: user,
            email: user.email,
            accessToken: token
        });
    } catch (e) {
        console.log(e)
        res.status(401).send({e});
    }


}
module.exports = {
    signin,
    signup
}
