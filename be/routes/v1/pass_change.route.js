const express = require("express");
const router = express.Router();
// const session = require("./../../middleware/session");
// const authenticate = require("../../middleware/authenticate");

const user = require("../../controllers/user.auth");

router.post("/change", user.changePass);

// router.post("/forgot", user.);

module.exports = router;
