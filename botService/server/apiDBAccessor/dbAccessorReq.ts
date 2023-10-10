import * as request from "superagent";
const apiUrl = "http://localhost:3001";

export const getQuestionnaire = async (questionnaireID) => {
  return await request
    .get(`${apiUrl}/api/questionnaire/getquestionnaire`)
    .query({ questionnaire_id: questionnaireID });
};

export const sendAnswers = async (answers) => {
  return await request.post(`${apiUrl}/api/answers/sendAnswers`).send(answers);
};
