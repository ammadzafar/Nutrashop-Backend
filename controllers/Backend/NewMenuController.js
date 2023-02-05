const models = require("../../models")
const Menus = models.menus
const slug = require('slug')
const CollectionMenus = models.collectionMenus
const {validationResult} = require('express-validator');
const decode = require("decode-html");

async function destroyOne(req, res) {
    const id = req.params.id
    try {
        let deletedCollectionsMenus = await CollectionMenus.destroy({
            where: {
                menuId: id
            }
        })

        let destroyed = await Menus.destroy({
            where: {
                id: id
            }
        })
        console.log(destroyed)
        if (destroyed !== 1) {
            return res.send({message: "cannot delete Menu something went Wrong"})
        } else {
            return res.send({message: `Menus with id ${id} Deleted Successfully`})
        }
    } catch (e) {
        console.log(e)
        return res.send({message: "Can't run the Function" + e})
    }
}

async function updateOne(req, res) {

    const id = req.params.id

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    if (req.body.collections) {
        var collections = req.body.collections;
        collections = collections.split(',')
    }

    try {
        let deletedCollectionsMenus = await CollectionMenus.destroy({
            where: {
                menuId: id
            }
        })
        console.log(deletedCollectionsMenus)

        let pivotTableRowEntry = [];
        if(req.body.collections !== "") {
        pivotTableRowEntry = collections.forEach(element => {

            let collectionMenusRowCreation =  CollectionMenus.create(
                {menuId: id, collectionId: element}
            )
            }
        )
        if(pivotTableRowEntry){
            return res.send({message: "cannot Create collection Menus something went Wrong"})
        }}
        let name = decode(req.body.name)
        name = name.replace(/&#x2F;/g, '/')
        const menu = {
            name: name,
            slug: slug(req.body.name),
            menuCollection: req.body.menuCollection,
        };
        let updated_menu = await Menus.update(menu, {
            where: {id: id}
        })
        console.log(updated_menu)
        return res.status(200).send({message: `the menu wit id ${id} is Updated Successfully`})
    } catch (e) {
        console.log(e)
        return res.status(500).send(
            {message: res.send(e) + "Menu cannot be updated"}
        )
    }
}

module.exports = {destroyOne, updateOne}
