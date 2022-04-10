/**
 * API's for Admin
 * Create professional
 * Create user
 * Create admin
 */

const CONSTANTS = require("../config/constants");
const { User } = require("../models/user.schema");
const { ProfessionalInfo } = require("../models/professional_info.schema");
const bcrypt = require("bcrypt");

/**
 * Create a professional
 * @param {Object} req
 * @param {Object} res
 */
async function createProfessional(req, res) {
  const {
    first_name,
    last_name,
    email,
    country,
    address,
    professional_type,
    password,
    gender,
    number,
    description,
  } = req.body;
  const name = first_name + " " + last_name;
  const professional_info = await new ProfessionalInfo({
    name: name,
    email: email,
    number: number,
    description: description,
    active: true,
    country: country,
    address: address,
    professional_type: professional_type,
    gender: gender,
    onboarding_date: Date.now(),
  });
  await professional_info.save();

  //assigning a random password to user
  const passwordHash = bcrypt.hashSync(password, 10);

  const user = await new User({
    first_name: first_name,
    last_name: last_name,
    email: email,
    user_type: CONSTANTS.USER_TYPE.PROFESSIONAL,
    password: passwordHash,
    professional_info: professional_info._id,
    activated: true,
  });

  await user.save();
  res.status(200).send({ message: "Created!" });
}

module.exports = {
  createProfessional,
};
