const express = require("express");
const router = express.Router();

// const authenticate = require("../../middleware/authenticate");

const user = require("../../controllers/client.dashboard");

router.get("/:clientId", user.readClient);

module.exports = router;
