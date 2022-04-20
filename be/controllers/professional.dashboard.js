/**
 * API's for Professional Dashboard
 * Get Professional info
 * Upload Videos
 * Upload Meal Plans
 * Get Calendar
 */

const logger = require("../utils/logger");
const { User } = require("../models/user.schema");
const { FileInfoSchema } = require("../models/file.schema");

/**
 * Get Client Info
 * @param {Object} req
 * @param {Object} res
 */
async function readProfessional(req, res) {
  try {
    const professional = await User.findById(req.params.professionalId)
      .select("activated")
      .populate({
        path: "professional_info",
        select:
          "name email address professional_type number description gender",
      });
    res.status(200).send(professional);
  } catch (error) {
    logger.error("Error in getting professional info: " + error);
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
async function getAllProfessional(req, res) {
  try {
    const allProfessionals = await User.find({
      user_type: "Professional",
    })
      .select("activated")
      .populate({
        path: "professional_info",
        select:
          "name email address professional_type number description gender",
      });
    res.status(200).send(allProfessionals);
  } catch (error) {
    logger.error("Error in getting all profesional data: " + error);
    res.status(500).send({
      message: "Something went wrong: " + error,
    });
  }
}

async function uploadFile(req, res) {
  try {
    const response = await new FileInfoSchema({
      file_public_url: req.file_public_url,
      professional_id: req.params.clientId,
      file_type: req.query.type,
    });

    await response.save();
    res.status(200).send({
      response,
    });
    return;
  } catch (error) {
    logger.error("Error in creating a reponse: " + error);
    res.status(500).send({
      message: "Something went wrong while saving the data: " + error,
    });
    return;
  }
}

module.exports = {
  readProfessional,
  getAllProfessional,
  uploadFile,
};
