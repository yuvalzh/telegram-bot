const express = require("express");

const auth = require("./auth");
const user = require("./user");
const users = require("./users");
const child = require("./child");
const questionnaire = require("./questionnaire");
const answers = require("./answers");

const router = express.Router();

router.use("/api/auth", auth);
router.use("/api/user", user);
router.use("/api/users", users);
router.use("/api/child", child);
router.use("/api/questionnaire", questionnaire);
router.use("/api/answers", answers);

module.exports = router;
