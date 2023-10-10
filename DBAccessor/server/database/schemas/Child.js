const mongoose = require('mongoose');
const { MongooseAutoIncrementID } = require("mongoose-auto-increment-reworked");
const Schema = mongoose.Schema;

const childSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  parentID: {
    type: String,
    required: true
  },
}, { timestamps: true, strict: false });


if (process.env.NODE_ENV !== "test") {
  MongooseAutoIncrementID.initialise("counters");

  childSchema.plugin(MongooseAutoIncrementID.plugin, {
    modelName: "Child",
    field: "child",
    incrementBy: 1,
    startAt: 1,
    unique: true,
    nextCount: false,
    resetCount: false,
  });
};
//model creation


const Child = mongoose.model("Child", childSchema)

module.exports = Child;