const express = require("express");
const requireAuth = require("../middleware/authMiddleware");
const { syncUser } = require("../controllers/userController");

const router = express.Router();

router.post("/sync", requireAuth, syncUser);

module.exports = router;