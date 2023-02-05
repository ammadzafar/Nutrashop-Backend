const db = require("../../../models");
const config = require("../../../config/auth.config");

const models = require("../../../models")
const User = models.users;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


async function signin(req, res) {
    try {
        const user = await User.findOne(
            {
            where: {
                email: req.body.email
            },
            include:{all:true,nested:true}
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
        // let role= await user.getRole()
        // authorities=[]
        // for (let i = 0; i < roles.length; i++) {
        //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
        // }
        res.status(200).send({
            id: user.id,
            user: user,
            username: user.username,
            email: user.email,
            // role: role,
            accessToken: token
        });
    } catch (e) {
        console.log(e)
        res.status(401).send({e});
    }


};
module.exports = {
    signin
}
