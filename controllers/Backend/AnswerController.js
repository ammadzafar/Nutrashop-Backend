const models = require("../../models")
const Answer = models.answerQuestion;
const Customer = models.customers
const Product = models.products
const User = models.users

const fs = require("fs")

async function findAll(req,res){
    try {
        let allAnswers = await Answer.findAll({
            include:[{model:Customer},{model:Product,nested:true},{model:User}]
        })
        if(!allAnswers){
            res.status(500).send({
                message:"unable to find all answers"
            })
        }
        res.status(200).send(allAnswers)

    }catch (e) {
        res.send(e)
        console.log(e)
    }
}
async function answerCreate(req, res) {
    const questionId = req.params.id
    console.log(questionId)
    try {

        let new_data = {
            userId: req.body.userId,
            answer: req.body.answer,
            answerCreatedAt: new Date()
        }

            let new_answer = await Answer.update(new_data, {
                where: {id: questionId}
            })
            if (new_answer == 1) {
                res.send(new_answer)
            } else {
                res.status(500).send({
                    message:" unable to add your answer"
                })
            }

    } catch (error) {
        res.status(500).send({
            message: res.send(error) + "unable to retrieve all tutorials"
        })
    }
}
async function toggleAllowed(req, res) {
    const questionId = req.params.id
    console.log(questionId)
    try {

        let new_data = {
            userId: req.body.userId,
            visibility:req.body.visibility,
        }
        console.log(new_data)
            // return new_data
            let new_answer = await Answer.update(new_data, {
                where: {id: questionId}
            })
            if (new_answer == 1) {
                res.send(new_answer)
            } else {
                res.status(500).send({
                    message:" unable to add your answer"
                })
            }

    } catch (error) {
        res.status(500).send({
            message: res.send(error) + "unable to retrieve all tutorials"
        })
    }
}

module.exports = {
    answerCreate,
    findAll,
    toggleAllowed
}