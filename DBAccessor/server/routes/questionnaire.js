const express = require("express");
const { Questionnaire } = require("../database/schemas");
const { Question } = require("../database/schemas");
const router = express.Router();
module.exports = router;

// asynchronous method - fetches a question by a given question id
async function findQuestionById(id) {
  let question;
  try {
    question = await Question.find({ _id: id });
  } catch (err) {
    console.log(err);
    return;
  }

  if (!question[0]) {
    return { message: "question does not exist" };
  }
  return question[0];
}

//returns a questionnaire object according to the questionnaire id
router.get("/getquestionnaire", (req, res) => {
  const questionnaireId = req.query.questionnaire_id;
  // async call to db - finds wanted questionnaire
  Questionnaire.find({ _id: questionnaireId }, async (err, questionnaire) => {
    if (err) {
      res
        .status(400)
        .send({ message: "Questionnaire access is not possible", err });
      return;
    }
    if (!questionnaire[0]) {
      res.status(400).send({ message: "questionnaire does not exist" });
      return;
    } else {
      //extracts list of question ids from questionnaire
      const question_ids = questionnaire[0].questionId;
      //awaits the array of promises returned by the findQuestionById function using map
      const question_list = await Promise.all(
        question_ids.map(findQuestionById).filter((y) => y != undefined)
      );
      questionnaire[0].questions = question_list;
      res.send({
        message: "successfully located the requested questionnaire",
        questionnaire_obj: questionnaire[0],
        questionnaire_id: questionnaire[0]._id,
      });
    }
  });
});

//returns a list of all questionnaire objects
router.get("/getquestionnaires", (req, res) => {
  Questionnaire.find((err, questionnaire) => {
    if (err) {
      res
        .status(400)
        .send({ message: "Questionnaire access is not possible", err });
      return;
    }
    if (!questionnaire[0]) {
      res.status(400).send({ message: "questionnaire does not exist" });
      return;
    }
    console.log(questionnaire);

    res.send({
      message: "successfully located requested questionnaires",
      questionnaires_list: questionnaire,
    });
  });
});
