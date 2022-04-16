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
      type: Number
    },
    weight: {
      type: Number
    },
    height: {
      type: Number
    },
    bmi: {
      type: Number
    },
    current_subscription: {
      type: Schema.Types.ObjectId,
      ref: CONSTANTS.MODELS.SUBSCRIPTION,
    },
  },
  { timestamps: true }
);

module.exports = {
  CustomerInfo: mongoose.model("CustomerInfo", customerInfoSchema),
};
