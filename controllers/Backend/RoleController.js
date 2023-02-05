const models = require("../../models")
const Roles = models.roles
const slug = require('slug')
const ModuleRoles = models.moduleRoles
const Modules = models.modules
const Users = models.users
const fs = require("fs")

async function create(req, res) {
    let role = {
        name: req.body.name,
        slug: slug(req.body.name)
    }
    let new_role = await Roles.create(role)
    if (!new_role) {
        res.status(500).send({
            message: res.message + "can Not create new Roles"
        })
    }
    let modules = JSON.parse(req.body.modules);
    let new_modules = []
    for (const module of modules) {

        let permission = ''
        if (module.permissionWrite) {
            console.log(module)

            permission = 'write'
        }
        if (module.permissionRead) {

            permission = 'read'
        }
        if (module.permissionWrite || module.permissionRead) {


            let moduleRoleObject = {
                moduleId: module.moduleId,
                roleId: new_role.id,
                permission: permission,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            new_modules.push(moduleRoleObject)
        }

    }


    await ModuleRoles.bulkCreate(new_modules)


    return res.status(200).send(
        {message: res.message + "New Role has been created"}
    )
}

async function findAll(req, res) {
    try {
        let allRoles = await Roles.findAll({
            include: {
                all: true, nested: true
            }
        })
        return res.status(200).send(allRoles)
    } catch (e) {
        return res.status(500).send({
            message: "cannot find the users"
        })
    }
}

async function findOne(req, res) {
    const id = req.params.id
    try {
        let oneRoles = await Roles.findOne({
            where: {id: id},
            include: {
                all: true, nested: true
            }
        })
        let moduleRoles = await ModuleRoles.findAll({
            where: {roleId: id},
            attributes:['roleId','moduleId','permission']
        })
        return res.status(200).send({oneRoles,moduleRoles})
    } catch (e) {
        return res.status(500).send({
            message: "cannot find the users"
        })
    }
}

const deleteData = async (id) => {
    await Users.destroy({where: {roleId: id}})
    await ModuleRoles.destroy({where: {roleId: id}})
    const deletedRole = await Roles.destroy({where: {id: id}})
    return deletedRole
}

async function deleteOne(req, res) {
    const id = req.params.id

    try {
        const requiredUser = await Users.findOne(
            {
                where: {
                    roleId: id
                },
                include: {all: true, nested: true},
            })
        console.log(requiredUser, "requiredUser")
        if (requiredUser !== null) {
            const userDeleted = await deleteData(id)
            return res.status(200).send({message: "User and Role Deleted Successfully", userDeleted})
        }
        await ModuleRoles.destroy({where: {roleId: id}})
        const deleteRoleModule = await Roles.destroy({where: {id: id}})
        return res.status(200).send({message: "Deleted Successfully", deleteRoleModule})
    } catch (e) {
        res.status(500).send({message: e})
    }
}

async function update(req, res) {

    const id = req.params.id

    let role = {
        name: req.body.name,
        slug: slug(req.body.name)
    }
    let allDeletedModules = await ModuleRoles.destroy({where: {roleId: id}})
    let new_role = await Roles.update(role, {where: {id: id}})
    if (!new_role) {
        res.status(500).send({
            message: res.message + "can Not create new Roles"
        })
    }
    let modules = JSON.parse(req.body.modules);
    let new_modules = []
    for (const module of modules) {

        let permission = ''
        if (module.permissionWrite) {
            console.log(module)

            permission = 'write'
        }
        if (module.permissionRead) {

            permission = 'read'
        }
        if (module.permissionWrite || module.permissionRead) {


            let moduleRoleObject = {
                moduleId: module.moduleId,
                roleId: id,
                permission: permission,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            new_modules.push(moduleRoleObject)
        }

    }


    await ModuleRoles.bulkCreate(new_modules)


    return res.status(200).send(
        {
            message: res.message + "New Role has been created",
            allDeletedModules
        }
    )
}

module.exports = {create, findAll, deleteOne, findOne, update}


