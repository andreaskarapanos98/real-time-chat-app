const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { clerkMiddleware } = require("@clerk/express");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");

const friendRoutes = require("./routes/friendRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use("/api/users", userRoutes);
app.use("/api/friends", friendRoutes);

app.get("/", (req, res) => {
  res.send("Real-time chat server is running");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});