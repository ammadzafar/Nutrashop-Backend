const models = require('../../models');
const Slider = models.slider;


async function create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    let slider = {
        name : req.body.name,
    }
    try {
        let newSlider = await Slider.create(slider)
        if (!newSlider) {
            res.status(500).send({
                message:" unable to add your slider"
            })
        }
        return res.status(200).send(newSlider)

    } catch (error) {
        res.status(500).send({ 
            message: res.send(error) + "unable to create The Slider"
        })
    }
}

async function update(req, res) {
    const id = req.params.id
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    let slider = {
        name : req.body.name,
    }
    try {
        let newSlider = await Slider.update(slider,{where:{id:id}})
        let coupon = await Discount.findByPk(id)
            let data = await coupon.addProduct(products)
        console.log(data,"=======")
        if(!data){
            return res.status(500).send({
                message: res.send(error) + "unable to create The Coupon"
            })
        }
        return res.status(200).send(coupon)

    } catch (error) {
        res.status(500).send({
            message: res.send(error) + "unable to create The Coupon"
        })
    }
}



module.exports = {
    create,update
}
