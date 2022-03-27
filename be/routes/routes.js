const express = require("express");
// const session = require("./../middleware/session");
const singUpRouter = require("./v1/signup.route");
const loginRouter = require("./v1/login.route");
const passChangeRouter = require("./v1/pass_change.route");
const clientDashboardRouter = require("./v1/client.dashboard.route");

const router = express.Router();

// Auth New User endpoint
router.use("/authnew", singUpRouter);

// Auth User endpoint
router.use("/auth", loginRouter);

// Auth User endpoint
router.use("/authpasschange", passChangeRouter);

// Customer Dashboard endpoint
router.use("/customer/dashboard", clientDashboardRouter);

module.exports = router;
