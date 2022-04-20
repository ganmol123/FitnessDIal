const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CONSTANTS = require("../config/constants");

const customerInfoSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    onboarding_date: {
      type: Date,
    },
    age: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
    bmi: {
      type: Number,
    },
    primary_goal: {
      type: String,
    },
    plans_enrolled: [
      {
        type: Schema.Types.ObjectId,
        ref: CONSTANTS.MODELS.PLANS,
      },
    ],
  },
  { timestamps: true }
);

module.exports = {
  CustomerInfo: mongoose.model("CustomerInfo", customerInfoSchema),
};
