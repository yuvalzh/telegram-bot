const express = require("express");

import questionnaire from "./questionnaire";

const router = express.Router();

router.use("/api/questionnaire", questionnaire);

module.exports = router;
