const express = require("express");
const bcrypt = require("bcryptjs");
import { sendQuestionnaire } from "../bot/Telegraf";
import { getQuestionnaire } from "../apiDBAccessor/dbAccessorReq";

const router = express.Router();

module.exports = router;

router.get("/here", (req, res) => {
  console.log("here");
});

router.post("/sendQuestionnaire", (req, res) => {
  console.log(req.body);
  //Missing data
  if (
    !req ||
    !req.body ||
    !req.body.userID ||
    !req.body.chatID ||
    !req.body.questionnaireID
  ) {
    res.status(400).send({ message: "Details missing in request body" });
    return;
  }

  // const result = sendQuestionnaire(
  //   req.body.chatID,
  //   req.body.userID,
  //   req.body.questionnaireID
  // );

  //Error when attempting to send - get to DBAccessor and try get questionnaire
  getQuestionnaire(req.body.questionnaireID)
    .then((questionnaire) => {
      const result = sendQuestionnaire(
        req.body.chatID,
        req.body.userID,
        questionnaire
      );
      res.send({
        message: "Sending a questionnaire completed successfully",
      });
    })
    .catch((error) => {
      console.log(error);
    });

  // db - write
  //Sending the questionnaire successful
});
