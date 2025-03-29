const express = require("express");
const router = express.Router();
const sosController = require("../controllers/sosController");  // ✅ Ensure the correct import

// ✅ Correct Route Definition
router.post("/sos", sosController.triggerSOS);

module.exports = router;  // ✅ Only export `router`
