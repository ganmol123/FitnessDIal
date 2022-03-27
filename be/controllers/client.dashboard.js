/**
 * API's for Professional Dashboard
 * Get Client info
 * Get Demo Videos
 * Get Calendar
 */

const logger = require("../utils/logger");
const { User } = require("../models/user.schema");

/**
 * Get Client Info
 * @param {Object} req
 * @param {Object} res
 */
async function readClient(req, res) {
  try {
    const client = await User.findById(req.params.clientId);
    const result = {
      first_name: client.first_name,
      last_name: client.last_name,
      email: client.email,
    };
    res.status(200).send(result);
  } catch (error) {
    logger.error("Error in getting Client info: " + error);
    res.status(500).send({
      message: "Something went wrong: " + error,
    });
  }
}

module.exports = {
  readClient,
};
