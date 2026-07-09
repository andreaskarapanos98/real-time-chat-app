const express = require("express");
const requireAuth = require("../middleware/authMiddleware");
const { sendFriendRequest, acceptFriendRequest, declineFriendRequest, getFriends, } = require("../controllers/friendController");

const router = express.Router();

router.post("/request", requireAuth, sendFriendRequest);
router.patch("/requests/:requestId/accept", requireAuth, acceptFriendRequest);
router.patch("/requests/:requestId/decline", requireAuth, declineFriendRequest);
router.get("/", requireAuth, getFriends);

module.exports = router;