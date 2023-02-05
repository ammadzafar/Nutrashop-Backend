const models = require('../../../models')
const Customer = models.customers
const {validationResult} = require('express-validator')
var bcrypt = require("bcryptjs");

async function passwordUpdate(req,res){
    const id = req.body.id
    try {
        const user = await Customer.findOne(
            {
                where: {
                    email: req.body.email
                },
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
                message: "Invalid Old Password!"
            });
        }
        let hugePassword = {
            password: bcrypt.hashSync(req.body.newPassword, 8)
        }
        console.log(hugePassword)
        let updatedPassword = await Customer.update(hugePassword,{
            where:{id:id}
        })
        if(!updatedPassword){
            res.status(500).send({
                message:res.message || "error"
            })
        }
        res.status(200).send({
            id: user.id,
            email: user.email,
        });
    } catch (e) {
        console.log(e)
        res.status(401).send({e});
    }
}
module.exports = {
    passwordUpdate
}