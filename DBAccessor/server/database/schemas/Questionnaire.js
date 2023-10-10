const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionnaireSchema = new Schema({
    title: String,
    questionId: [String],
    questionnaireId: Number,
    questions: []
});

const Questionnaire = mongoose.model("Questionnaire", questionnaireSchema);

module.exports = Questionnaire;
