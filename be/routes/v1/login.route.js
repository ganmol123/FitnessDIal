const express = require("express");
const router = express.Router();
const session = require("./../../middleware/session");
const authenticate = require("../../middleware/authenticate");

const app = express();
// app.set("trust proxy", 1);
// app.use(session);

const user = require("../../controllers/user.auth");

router.post("/login", user.login);

router.get("/logout", authenticate, user.logout);

module.exports = router;
