const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(400)
        .json({ error: "Invalid username or password" });
    }
    // Lưu userId vào session
    req.session.userId = user._id;
    // Tuỳ chọn: set cookie riêng (ngoài connect.sid mặc định)
    res.cookie("sid", req.sessionID, {
      httpOnly: true,
      secure: false, // 🔒 đổi thành true nếu deploy HTTPS
      maxAge: 1000 * 60 * 60, // 1 giờ
    });
    res.json({ message: "Login successful!" });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    // Xoá cookie lưu session
    res.clearCookie("sid");          // nếu bạn set cookie 'sid'
    res.clearCookie("connect.sid");  // Express-session mặc định tạo 'connect.sid'
    return res.json({ message: 'Logout successful!' });
  });
});

// Protected route example
router.get("/me", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json({ message: "You are logged in", userId: req.session.userId });
});

module.exports = router;
