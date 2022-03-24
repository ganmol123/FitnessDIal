const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CONSTANTS = require("../config/constants");

const subscriptionSchema = new Schema(
  {
    active: { type: Boolean, default: false },
    start_date: { type: Date },
    end_date: { type: Date },
    quota: { type: Number },
    remaining: { type: Number },
    package_price: { type: Number },
    currency: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = subscriptionSchema;

module.exports = {
  Subscription: mongoose.model("Subscription", subscriptionSchema),
};
