const express = require("express");
const requireAuth = require("../middleware/authMiddleware");
const { syncUser, searchUserByEmail, } = require("../controllers/userController");

const router = express.Router();

router.post("/sync", requireAuth, syncUser);
router.get("/search", requireAuth, searchUserByEmail);

module.exports = router;