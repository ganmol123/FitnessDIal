const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const professionalInfoSchema = new Schema(
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
    active: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = {
  ProfessionalInfo: mongoose.model("ProfessionalInfo", professionalInfoSchema),
};
