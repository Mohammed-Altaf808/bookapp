const express = require("express");
const router = express.Router();
const user = require("../../models/user");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("signup", { error: null });
});

router.post("/", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if a user with the given email already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.render("signup", {
        error: "User already exists. Please try a different email or log in."
      });
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new user({
      email,
      username,
      password: hash
    });

    await newUser.save();

    // Redirect to the user's profile page
    res.redirect(`/user/${newUser.username}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

module.exports = router;