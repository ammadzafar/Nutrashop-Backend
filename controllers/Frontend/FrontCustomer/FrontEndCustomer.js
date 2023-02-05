const models = require('../../../models')
const Customer = models.customers
const db = models.sequelize;
const {validationResult} = require('express-validator')

exports.findOne = (req, res) => {
    const id = req.params.id;
    Customer.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Customer with id=" + id
            });
        });
};
exports.updatePhone= async (req,res)=>{
    const id = req.params.id;
    const phone = req.body.phone;
    console.log(phone)
    const transaction = await db.transaction();
    try{
        let newCustomerNumber = await Customer.update({phone:phone}, {
            where: {id: id}
        },transaction)
        await transaction.commit();
        return res.status(200).send({newCustomerNumber})
    }catch (e) {
        res.status(500).send({e})
        await transaction.rollback();
    }
}
exports.update = (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
        console.log(errors)
    }
    const id = req.params.id;
    var customer = {}
    customer={
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        phone:req.body.phone,
    }
    Customer.update(customer,{
        where:{id:id},
    }).then((num) => {
        if (num == 1) {
            res.send({
                message: "Customer was updated successfully.",
            });
        } else {
            res.send({
                message: `Cannot update`
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: "Error Customer update with id=" + id
            });
        });

}