const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CONSTANTS = require("../config/constants");

const plansSchema = new Schema(
  {
    active: { type: Boolean, default: false },
    professional_id: {
      type: Schema.Types.ObjectId,
      ref: CONSTANTS.MODELS.PROFESSIONAL_INFO,
    },
    type: {
      type: String,
    },
    files: [
      {
        type: Schema.Types.ObjectId,
        ref: CONSTANTS.MODELS.FILES,
      },
    ],
    description: {
      type: String,
    },
    duration: {
      type: String,
    },
    requirements: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = {
  PlansSchema: mongoose.model("PlansSchema", plansSchema),
};
