const express = require("express");
const { Answers, Question } = require("../database/schemas");

const router = express.Router();

module.exports = router;

// a function that finds answers by date
const findAnswersbyDate = async (date) => {
  // const date = req.body.dateAndTime;
  const startDate = new Date(date);
  const nextDay = new Date(startDate);
  nextDay.setDate(startDate.getDate() + 1);

  let answersArray = [];
  try {
    answersArray = await Answers.find({
      dateAndTime: {
        $gte: startDate,
        $lte: nextDay,
      },
    }).exec();
  } catch (err) {
    return { message: "error in find function" };
  }

  if (!answersArray[0]) {
    return { message: "answer does not exist" };
  }
  console.log(answersArray);
  return answersArray;
};

// asynchronous method - fetches a question by a given question id
async function findQuestionById(id) {
  let question;
  try {
    question = await Question.find({ _id: id });
  } catch (err) {
    return { message: "Questions access is not possible", err };
  }

  if (!question[0]) {
    return { message: "question does not exist" };
  }
  return question[0];
}
//creates answer Ids array from answers object chosen by date
const getAnswerIds = async (date) => {
  // const date = "2022-04-16";
  let answerIdList = [];
  const answerList = await findAnswersbyDate(date);
  answerList.map((answerObject) => {
    answerIdList.push(answerObject.questionId);
  });
  console.log(answerIdList);
  return answerIdList;
};

//-------requests----------

//saves answers to db accessor
router.post("/sendAnswers", (req, res) => {
  console.log("debug info");
  const answers = Answers(req.body);
  answers.save((err, savedAnswers) => {
    if (err || !savedAnswers) {
      res.status(400).send({ message: "Failed to save answers to DB", err });
    } else {
      res.send({
        message: "Answers saved successfully",
      });
    }
  });
});

//gets answers from a chosen date
router.get("/getanswers", async (req, res) => {
  const date = req.body.date;

  const questionList = await Promise.all(
    (await getAnswerIds(date))
      .map(findQuestionById)
      .filter((y) => y != undefined)
  );

  if (!questionList) {
    res
      .status(400)
      .send({ message: "error in getting questions of answers by date" });
  }
  console.log(questionList);

  const answersList = await findAnswersbyDate(date);

  if (!answersList) {
    res.status(400).send({ message: "error in getting answers by date" });
  }

  console.log(answersList);

  res.send({
    message: "success in retrieving questions and answers list",
    questionList,
    answersList,
  });
});
