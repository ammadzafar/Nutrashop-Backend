const models = require("../../models")
const Banners = models.banners
const slug = require('slug')
const { banners } = require("../../models")
const Products = models.products
const Collections = models.collections

async function create(req, res) {
    let banner = {}
    if(req.body.collectionId){
        banner = {
            image: req.body.image,
            mobileImage: req.body.mobileImage,
            slug: slug(req.body.placeholder),
            placeholder: req.body.placeholder,
            collectionId: req.body.collectionId,
            isFeatured: req.body.isFeatured,
        }
    }else if(req.body.productId){
        banner = {
            image: req.body.image,
            mobileImage: req.body.mobileImage,
            slug: slug(req.body.placeholder),
            placeholder: req.body.placeholder,
            isFeatured: req.body.isFeatured,
            productId: req.body.productId,
        }
    }

    let new_banner = await Banners.create(banner)
    if (!new_banner) {
        res.status(500).send({
            message: "can Not Create new Banners"
        })
    }
    return res.status(200).send({
        new_banner,message: "New Banner has been Created"
    })
}

async function findAll(req, res) {
    try {
        let allBanners = await Banners.findAll({
            include: [{model:Products},{model:Collections}],
        })
        return res.status(200).send(allBanners)
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            message: "cannot find the banners"
        })
    }
}

async function findOne(req, res) {
    const id = req.params.id
    try {
        let allBanners = await Banners.findOne({
            where:{id:id},
            include: [{model:Products},{model:Collections}],
        })
        return res.status(200).send(allBanners)
    } catch (e) {
        console.log(e)
        return res.status(500).send({
            message: "cannot find the banner"
        })
    }
}

async function updateCompleteBanner(req, res) {
    const id = req.params.id;
    let banner = {}
    if(req.body.collectionId){
        banner = {
            image: req.body.image,
            mobileImage: req.body.mobileImage,
            slug: slug(req.body.placeholder),
            placeholder: req.body.placeholder,
            collectionId: req.body.collectionId,
            isFeatured: req.body.isFeatured,
        }
    }else if(req.body.productId){
        banner = {
            image: req.body.image,
            mobileImage: req.body.mobileImage,
            slug: slug(req.body.placeholder),
            placeholder: req.body.placeholder,
            isFeatured: req.body.isFeatured,
            productId: req.body.productId,
        }
    }

    let new_banner = await Banners.update(banner, {
        where: {id: id},
    })
    if (new_banner === 0) {
        res.status(500).send({
            message: "can Not Update new Banners"+`with id ${id}`
        })
    }
    return res.status(200).send(
        {new_banner,message: `Banner with id ${id} has been Updated`}
    )
}

async function updateImage(req, res) {
    const id = req.params.id;
    let banner = {}
    if(req.body.collectionId){
        banner = {
            mobileImage: "bannerForMobiles/" + req.file.filename,
            slug: slug(req.body.placeholder),
            placeholder: req.body.placeholder,
            collectionId: req.body.collectionId,
            isFeatured: req.body.isFeatured,
        }
    }else if(req.body.productId){
        banner = {
            mobileImage: "bannerForMobiles/" + req.file.filename,
            slug: slug(req.body.placeholder),
            placeholder: req.body.placeholder,
            isFeatured: req.body.isFeatured,
            productId: req.body.productId,
        }
    }

    let new_banner = await Banners.update(banner, {
        where: {id: id},
    })
    if (new_banner == 0) {
        res.status(500).send({
            message: "can Not Update new Banners"+`with id ${id}`
        })
    }
    return res.status(200).send(
        {new_banner,message: `Banner with id ${id} has been Updated`}
    )
}

async function addBannerimage(req, res) {
    let image= "banners/" + req.file.filename

    return res.status(200).send(
        {image,message: `Banner Image is Uploaded to Banner`}
    )
}
async function addMobileImage(req, res) {
    let mobileImage= "bannerForMobiles/" + req.file.filename

    return res.status(200).send(
        {mobileImage,message: `Mobile Image is Uploaded to Banner`}
    )
}

async function deleteOne(req, res) {
    const id = req.params.id;
    let new_banner = await Banners.destroy({
        where: {id: id},
    })
    if (new_banner == 0) {
        res.status(500).send({
            message: "cannot delete Banners"+`with id ${id}`
        })
    }
    return res.status(200).send(
        {new_banner,message: `Delete Banner with id ${id}`}
    )
}

async function addBid(req, res) {
    const id = req.params.id;
    let banner = {
        isFeatured: req.body.isFeatured,
    }
    let new_banner = await Banners.update(banner, {
        where: {id: id},
    })
    if (new_banner == 0) {
        res.status(500).send({
            message: "can Not Add Bid to Banners"+`with id ${id}`
        })
    }
    return res.status(200).send(
        {new_banner,message: `Bid is added to Banner with id ${id}`}
    )
}

module.exports = {create, findAll, updateImage ,findOne , addBannerimage, addMobileImage ,updateCompleteBanner, deleteOne,addBid}

