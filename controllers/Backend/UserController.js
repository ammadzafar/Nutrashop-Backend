const models = require("../../models")
const Users = models.users
const slug = require('slug')
const fs = require("fs")
var bcrypt = require("bcryptjs");

async function create(req, res) {
    let password = req.body.password
    let confirmPassword = req.body.confirmPassword
    if(password== confirmPassword){
        console.log("same")

        var samePassword = await bcrypt.hash(password, 8)

    }else {
        console.log("diff")
        return res.status(500).send("cannot create user password is not same")
    }
   // var image = await  "users/" + req.file.filename
   //  console.log(image)
   try {
           let user = {
               firstName:req.body.firstName,
               lastName:req.body.lastName,
               password:samePassword,
               email:req.body.email,
               roleId:req.body.roleId,
              // image: image,
           }
           console.log(user)
           let new_user = await Users.create(user)
           return res.send(new_user)

   }catch (e) {
        console.log(e)
       return res.status(500).send(
           {message: res.send(e) + "New User cannot be created"}
       )
   }

}
// delete one user by id
async function destroyOne(req,res){
    const id = req.params.id
    console.log(id)
    try{
        let destroyed = await Users.destroy({
            where:{
                id:id
            }
        })
        console.log(destroyed)
        if(destroyed==1){
           return res.send({message:"User Deleted Successfully"})
        }else {
            return res.send({message:"cannot delete User something went Wrong"})
        }
    }catch (e) {
        console.log(e)
    }
}
//get one user by id
async function findOne (req,res){
    const id =req.params.id
    console.log(id)
    try {
        let requestedUser= await Users.findByPk(id)
        if(!requestedUser){
            res.status(500).send({
                message: res.message + `Sorry Unable to find the User with=${id}`
            })
        }
        return res.send(requestedUser)

    }catch(e)
    {
        console.log(e)
        return res.status(200).send(
            {message: res.message + `Unable to find the User with=${id}`}
        )
    }
}

//get all users
async function findAll(req,res){
    try {
        let allUsers = await Users.findAll({
            order:[
                ['id', "DESC"]
            ],
            // attributes:["id","firstName", "lastName","email","roleId"],
            include:{all:true, nested:true}
        })
        if(!allUsers){
            res.status(500).send({
                message:res.message+"unable to retrieve data"
            })
        }
        console.log(allUsers[0].dataValues)
        return res.send(allUsers)
        
    }catch (e) {
        res.status(500).send({
            message:res.message+"unable to retrieve data of all users"
        })
    }
}

async function updateOne(req,res){
    var id = req.params.id
console.log(id)
    let password = req.body.password
    let confirmPassword = req.body.confirmPassword
    if(password== confirmPassword){
        console.log("same")

        var samePassword = await bcrypt.hash(password, 8)

    }else {
        console.log("diff")
        return res.status(500).send("cannot Update user password is not same")
    }
    try {
        let user = {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:samePassword,
            email:req.body.email,
            roleId:req.body.roleId,
        }
        console.log(user)
        let updated_user = await Users.update(user,{
            where:{id:id}
        })
        console.log(updated_user)
        if(updated_user == 1){
            return res.status(200).send({message:"the user is Updated Successfully"})
        }else {
            return res.status(500).send({message:"the user cannot be Updated"})
        }

    }catch (e) {
        console.log(e)
        return res.status(500).send(
            {message: res.send(e) + "User cannot be updated"}
        )
    }



}

module.exports = {create,findAll,findOne,destroyOne,updateOne}
