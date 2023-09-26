const express = require("express");
const router = express.Router();
const User = require("../Schema/userSchema");
const { body, validationResult } = require("express-validator");

router.post(
  "/createUser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 8 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
    // Add validation for the "location" field if required
    // body("location").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log("Creating user...");

      const newUser = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        // Add the "location" field if it's required
        location: req.body.location || "",
      });

      // Send the response after user creation, not inside the "then"
      console.log("User created:", newUser);
      res.json({ success: true });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

module.exports = router;
