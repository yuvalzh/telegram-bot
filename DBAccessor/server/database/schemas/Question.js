const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  body: String,
  is_multiple_choice: Boolean,
  offered_answers: Array,
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;

