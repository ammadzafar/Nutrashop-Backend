const models = require("../../models")
const Collection= models.collections

exports.findAll=(req,res)=>{
    Collection.findAll({
        attributes:['id','collectionId','name', 'image']
    }).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message:
                err.message||'message is not good'
        })
    })
}
