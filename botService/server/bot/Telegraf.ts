import { Telegraf } from "telegraf";
import { sendAnswers } from "../apiDBAccessor/dbAccessorReq";
const fetch = require("node-fetch").default;
const BOT_TOKEN = "5274083217:AAHCyJtylTv9irezW-HGlxTqyI9K6_R6Tj0";
const bot = new Telegraf(BOT_TOKEN);

export function startBot() {
  bot.start((ctx) => {
    ctx.telegram.sendMessage(
      ctx.message.chat.id,
      `היי ${ctx.from.first_name}\n מספר הזהות שלך בטלגרם הוא: ${ctx.message.chat.id}\n יש לשמור את המספר להמשך לצורך שאלון `,
      {
        reply_markup: {
          force_reply: true,
        },
      }
    );
  });
  bot.launch();
}
// const questionnaire = require("../test/questionnaires.json");
// const questions = questionnaire.questions;
export function sendQuestionnaire(chatId, userId, questionnaire) {
  const questions = questionnaire.body.questionnaire_obj.questions;
  bot.telegram.sendMessage(
    chatId,
    "היי🤗\nקיבלת שאלון מטפל.ת מאפליקציית YALMO, כדי להתחיל לחצו /go"
  );

  let i = 0;

  bot.command("go", (ctx) => {
    console.log(questions);
    var result = [];
    for (let j = 0; j < questions[0].offered_answers.length; j++) {
      result.push({
        text: questions[0].offered_answers[j],
        callback_data: questions[0].offered_answers[j],
      });
    }
    bot.telegram.sendMessage(ctx.chat.id, questions[i].body, {
      reply_markup: {
        inline_keyboard: [result],
      },
    });
  });

  bot.action(/.+/, (ctx) => {
    const dataForDb = {
      userId: userId,
      questionId: questions[i]._id,
      answer: ctx.match.input,
      questionnaireId: questionnaire.body.questionnaire_id,
      dateAndTime: new Date(),
      //chatId: chatId,
    };
    sendAnswers(dataForDb);
    if (i < questions.length - 1) {
      i++;
      var result = [];
      for (let j = 0; j < questions[i].offered_answers.length; j++) {
        result.push({
          text: questions[i].offered_answers[j],
          callback_data: questions[i].offered_answers[j],
        });
      }
      bot.telegram.sendMessage(ctx.chat.id, questions[i].body, {
        reply_markup: {
          inline_keyboard: [result],
        },
      });
    } else if (i === questions.length - 1) {
      ctx.reply("תודה על שיתוף הפעולה,\nיום מקסים🌸");
    }
  });
}
