const express = require("express");
const router = express.Router();

const user = require("../../controllers/client.dashboard");

router.get("/:clientId", user.readClient);

router.get("/plans/:clientId", user.getPlans);

module.exports = router;
