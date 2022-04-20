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
    const client = await User.findById(req.params.clientId)
      .select("activated")
      .populate({
        path: "customer_info",
        select: "name email address number description gender plans_enrolled",
      });

    res.status(200).send(client);
    return;
  } catch (error) {
    logger.error("Error in getting Client info: " + error);
    res.status(500).send({
      message: "Something went wrong: " + error,
    });
  }
}

/**
 * Get Client Info
 * @param {Object} req
 * @param {Object} res
 */
async function getPlans(req, res) {
  try {
    const plans = await User.findById(req.params.clientId)
      .select("activated customer_info")
      .populate({
        path: "customer_info",
        populate: {
          path: "plans_enrolled",
          populate: {
            path: "files",
          },
        },
      });

    res.status(200).send(plans);
    return;
  } catch (error) {
    logger.error("Error in getting Client info: " + error);
    res.status(500).send({
      message: "Something went wrong: " + error,
    });
  }
}

module.exports = {
  readClient,
  getPlans,
};
