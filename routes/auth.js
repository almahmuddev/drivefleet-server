const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// POST /auth/jwt — called after login or Google sign-in
// creates a token and stores it in an HTTPOnly cookie
router.post("/jwt", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, cookieOptions).json({ success: true });
});

// POST /auth/logout — clears the cookie
router.post("/logout", (req, res) => {
  res
    .clearCookie("token", {
      ...cookieOptions,
      maxAge: 0,
    })
    .json({ success: true });
});

module.exports = router;
