const express = require("express");
const router = express.Router();
// const session = require("./../../middleware/session");
// const authenticate = require("../../middleware/authenticate");

const admin = require("../../controllers/admin");

router.post("/createProfessional", admin.createProfessional);

// router.get("/logout", authenticate, user.logout);

module.exports = router;
