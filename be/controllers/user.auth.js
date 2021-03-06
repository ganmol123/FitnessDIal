/**
 * API's for User Authentication
 * Sign Up - For Customer & Professional
 * Login API's - For Cutomer, Professional & Admin
 * Forgot Password - For Customer & Professional
 */

const logger = require("../utils/logger");
const { User } = require("../models/user.schema");
const { CustomerInfo } = require("../models/customer_info.schema");
const { ProfessionalInfo } = require("../models/professional_info.schema");
const { AdminInfo } = require("../models/admin_info.schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const CONFIG = require("../config/index");

const {
  sendEmailForActivatingCustomer,
  sendEmailForActivatingProfessional,
  sendAccountActivationMail,
} = require("../services/sendGrid");

/**
 * Sign up user - send email for user acivation
 * Sign is only available for Customers and Professional
 * Admin's creds will be directly sent by the dev team
 * @param {Object} req
 * @param {Object} res
 */
async function signUp(req, res) {
  const { first_name, last_name, email, phone_number, user_type } = req.body;

  const userExists = await User.findOne({ email: email });
  if (userExists != null || userExists) {
    res.status(401).send({
      message: "Bad request params - email already exists. Try logging in!",
      userInfo: userExists
    });
    return;
  }

  try {
    //assigning a random password to user
    const autoGenPass = crypto.randomBytes(20).toString("hex");
    const passwordHash = bcrypt.hashSync(autoGenPass, 10);

    const user = await new User({
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      user_type: user_type,
      password: passwordHash,
    });

    if (user_type == "Customer") {
      const customer = await new CustomerInfo({
        name: first_name + " " + last_name,
        email: email,
      });
      await customer.save();
      user.customer_info = customer._id;
    } else if (user_type == "Professional") {
      const professional = await new ProfessionalInfo({
        name: first_name + " " + last_name,
        email: email,
      });
      await professional.save();
      user.professional_info = professional._id;
    }

    await user.save();

    const token = await usePasswordHashToMakeToken(
      user._id,
      user.password,
      user.createdAt
    );

    // create password reset url from token
    const url = `${CONFIG.CLIENT_SIDE_URL}/createPass/?id=${user._id}&token=${token}`;

    // send email
    if (user_type == "Customer")
      await sendEmailForActivatingCustomer(user, url);
    else if (user_type == "Professional")
      await sendEmailForActivatingProfessional(user, url);

    res.status(200).send({
      message: "Sent mail for Authentication!",
      userInfo: user
    });
  } catch (error) {
    logger.error("Error in sign up: " + error);
    res.status(401).send({
      message: "Error: " + error,
    });
    return;
  }
}

/**
 * Sign up user - Verify create password link, add password to db and activate user
 * @param {Object} req
 * @param {Object} res
 */
async function createPassword(req, res) {
  const { userId, token } = req.params;
  const { new_pass, confirm_new_pass } = req.body;
  try {
    const user = await User.findById(userId);
    if (user === null) {
      res.status(401).send({ message: "You are not Authorized!" });
      return;
    }
    // check if token is correct
    const secret = user.password + "-" + user.createdAt;
    jwt.verify(token, secret, async (err, payload) => {
      if (err || payload.userId != user._id) {
        logger.info(err);
        res.status(401).send({ message: "You are not Authorized!!" });
        return;
      }
      await checkPassConstraints(new_pass, confirm_new_pass);

      const passwordHash = bcrypt.hashSync(new_pass, 10);

      //updating password and activating user
      user.password = passwordHash;
      user.activated = true;
      user.save();

      sendAccountActivationMail(user);
      res.status(200).send({ message: "Password successfully changed!" });
    });
  } catch (error) {
    logger.error("Error: " + error);
    res.status(401).send({
      message: "Error: " + error,
    });
  }
}

/**
 * Login & create cookie
 * @param {Object} req
 * @param {Object} res
 */
async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).send({
      message:
        "Bad request params - you need to provide an email and a password",
    });
    return;
  }
  try {
    // const validated =
    const userInfo = await authenticate(username, password);
    // req.session.user = validated;
    res.status(200).send({
      message: "Successfully logged in!",
      userInfo: userInfo
    });
  } catch (error) {
    logger.error("Error in authenticating: " + error);
    res.status(401).send({
      message: "Error: " + error,
    });
    return;
  }
}

/**
 * Logout & destroy cookie
 * @param {Object} req
 * @param {Object} res
 */
function logout(req, res) {
  req.session.destroy(function (err) {
    if (err) {
      logger.error(err);
      res.status(500).send({ message: "Something went wrong!" }); // can be redirected to login in prod
    } else {
      res.status(200).send({ message: "Logged out Successfully" }); // can be redirected to login in prod
    }
  });
}

/**
 * Change password - While logged in
 * @param {Object} req
 * @param {Object} res
 */
async function changePass(req, res) {
  const { curr_pass, new_pass, confirm_new_pass } = req.body;
  try {
    const user = await User.findById(req.userId);
    const match = bcrypt.compareSync(curr_pass, user.password);
    if (!match) {
      res.status(401).send({ message: "Password entered is wrong!" });
      return;
    }
    await checkPassConstraints(new_pass, confirm_new_pass);
    const passwordHash = bcrypt.hashSync(new_pass, 10);
    user.password = passwordHash;
    await user.save();
    await passwordChangeSuccess(user);
    res.status(200).send({ message: "Password successfully changed!" });
  } catch (error) {
    logger.error("Error in updating password: " + error);
    res.status(500).send({
      message: "Error: " + error,
    });
  }
}

/**
 * Forgot password - Send Email
 * @param {Object} req
 * @param {Object} res
 */
async function forgotPass(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user === null) {
      res.status(401).send({ message: "Entered email does not exist!" });
      return;
    }
    // create token
    const token = await usePasswordHashToMakeToken(
      user._id,
      user.password,
      user.createdAt
    );
    // create password reset url from token
    const url = `${CONFIG.CLIENT_SIDE_URL}?id=${user._id}&token=${token}`;

    // send email
    if (user.user_type == "Customer")
      await sendEmailForActivatingCustomer(user, url);
    else if (user.user_type == "Professional")
      await sendEmailForActivatingProfessional(user, url);

    res.status(200).send({ message: "Email successfully sent!" });
  } catch (error) {
    logger.error("Error: " + error);
    res.status(500).send({
      message: "Error: ",
    });
  }
}

/**
 * Check if email & pass exists
 */
async function authenticate(email, password) {
  try {
    const user = await User.findOne({ email: email });
    if (user === null) {
      logger.error("Email is not valid! Please Sign Up!");
      return Promise.reject("Email is not valid!");
    }
    if (user.activated == null || !user.activated) {
      const token = await usePasswordHashToMakeToken(
        user._id,
        user.password,
        user.createdAt
      );
      // create password reset url from token
      const url = `${CONFIG.CLIENT_SIDE_URL}/createPass/?id=${user._id}&token=${token}`;
      // send email
      if (user.user_type == "Customer")
        await sendEmailForActivatingCustomer(user, url);
      else if (user.user_type == "Professional")
        await sendEmailForActivatingProfessional(user, url);

      logger.error("Email is not verified! Please Check mail!");
      return Promise.reject("Email is not verified!");
    }

    const match = bcrypt.compareSync(password, user.password);
    if (match) {
      // const user_info = {
      //   first_name: user.first_name,
      //   last_name: user.last_name,
      //   email: user.email,
      //   userId: user._id,
      // };
      return user;
    } else {
      logger.error("Password is not valid!");
      return Promise.reject("Password is not valid!");
    }
  } catch (err) {
    logger.error("Something went wrong: " + err);
    return Promise.reject("Something went wrong");
  }
}

/**
 * Checks password equality, contraints & updates db with new pass
 * Regex check: Atleast 1 lowercase, 1 uppercase, 1 number. length 6 - 20
 */
async function checkPassConstraints(new_pass, confirm_new_pass) {
  try {
    if (new_pass != confirm_new_pass) {
      logger.error("Entered password do not match!");
      return Promise.reject("Entered password do not match!");
    }
    if (!new_pass.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,100}$/)) {
      logger.error("Entered password do not meet constraints!");
      return Promise.reject("Entered password do not meet constraints!");
    }
  } catch (err) {
    logger.error("Something went wrong: " + err);
    return Promise.reject("Something went wrong");
  }
}

/**
 * Creates token using old pass & createdAt
 */
async function usePasswordHashToMakeToken(userId, passwordHash, createdAt) {
  const secret = passwordHash + "-" + createdAt;
  const token = jwt.sign({ userId }, secret, {
    expiresIn: 3600, // 1 hour
  });
  return token;
}

module.exports = {
  signUp,
  createPassword,
  login,
  logout,
  changePass,
  forgotPass,
};
