const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answersSchema = new Schema({
  userId: { type: String },
  questionId: { type: String },
  answer: { type: String },
  questionnaireId: { type: String },
  dateAndTime: { type: Date },
});

const Answers = mongoose.model("Answers", answersSchema);

module.exports = Answers;
