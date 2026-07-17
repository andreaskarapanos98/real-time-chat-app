const express = require("express");
const requireAuth = require("../middleware/authMiddleware");
const { getConversation } = require("../controllers/chatController");

const router = express.Router();

router.get("/:friendId", requireAuth, getConversation);

module.exports = router;