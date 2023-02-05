const {Op} = require ('sequelize')

const models = require("../../models");
const Question = models.answerQuestion;
const Customer = models.customers;
const OrderProducts = models.orderProducts;
const Products = models.products;
const User = models.users
const fs = require("fs");

async function questionCreate(req, res) {
  if (req.body.question === undefined) {
    res.status(422).json({errors: "Question required"});
  }
  let questionData = {
    question: req.body.question,
    customerId: req.body.customerId,
    productId: req.body.productId,
  };
  try{
    let new_question = await Question.create(questionData);
    if (!new_question) {
      res.status(500).send({
        message: "can Not create new Question",
      });
    }
    return res.status(200).send(new_question);
  }catch (e) {
    res.status(500).send(e)
  }
}
async function findAllQuestionAnswers(req, res) {
  const productId = req.params.id;
  console.log(productId);
  try {
    let allQuestionAnswers = await Question.findAll({
      where:{
        [Op.and]:[{productId:productId},{visibility:true}]
      },
      order: [
        ['id', 'DESC'],
      ],
      include: [{ model:Customer },{model:Products},{model:User}],
      attributes: [
        "id",
        "customerId",
        "productId",
        "userId",
        "question",
        "answer",
        "answerCreatedAt",
          "createdAt",

      ],
    });
    let requiredQuestionData = allQuestionAnswers.map(question=>({
      id:question.id,
      question:question.question,
      answer:question.answer,
      answerCreatedAt:question.answerCreatedAt,
      customerName:question.Customer.firstName+" "+question.Customer.lastName,
      productId:question.productId,
      createdAt:question.createdAt,
      user:question.User

    }))
    return res.status(200).send(requiredQuestionData);
  } catch (err) {
    res.status(500)
    console.log(err);
  }
}
module.exports = {
  questionCreate,
  findAllQuestionAnswers,
};
