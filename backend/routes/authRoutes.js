const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Simple hardcoded admin credentials for the assignment scope
  if (username === "admin" && password === "admin123") {
    res.json({ success: true, message: "Login successful", username: "admin" });
  } else {
    res.status(401).json({ success: false, message: "Invalid username or password" });
  }
});

module.exports = router;
