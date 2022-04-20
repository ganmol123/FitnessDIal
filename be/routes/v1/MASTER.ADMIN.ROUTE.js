const express = require("express");
const router = express.Router();

const admin = require("../../controllers/MASTER.ADMIN");

router.post("/createProfessional", admin.createProfessional);

module.exports = router;
