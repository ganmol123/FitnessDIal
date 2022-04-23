/**
 * API's for Professional Dashboard
 * Get Client info
 * Get Demo Videos
 * Get Calendar
 */

const lodash = require("lodash");
const logger = require("../utils/logger");
const { User } = require("../models/user.schema");
const { CustomerInfo } = require("../models/customer_info.schema");

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
 * Update candiate
 * @param {Object} req
 * @param {Object} res
 */
async function updateClient(req, res) {
  try {
    if (lodash.isEmpty(req.body)) {
      return res.status(400).send({
        message: "Body cannot be empty!",
      });
    }

    if (req.body.name || req.body.email) {
      return res.status(400).send({
        message:
          "Body cannot contain name and email and they can't be updated. Contact Customer support!",
      });
    }

    const client = await User.findById(req.params.clientId);
    const candidatedata = await CustomerInfo.findByIdAndUpdate(
      client.customer_info,
      req.body,
      { new: true }
    );
    res.status(200).send(candidatedata);
  } catch (error) {
    logger.error("Error in updating Customer data: " + error);
    res.status(500).send({
      message: "Something went wrong." + error,
    });
  }
}

/**
 * Get All the plans and videos uploaded by the client
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
  updateClient,
};
