const express = require("express");
const router = express.Router();
const { multer } = require("../../services/multer");
const { fileUploader } = require("../../middleware/fileUploader");

// const authenticate = require("../../middleware/authenticate");

const user = require("../../controllers/professional.dashboard");

router.get("/:clientId", user.readClient);

router.get("/", user.getAllProfessional);

router.post(
  "/:clientId/upload",
  multer.single("file"),
  fileUploader,
  user.uploadFile
);

module.exports = router;
