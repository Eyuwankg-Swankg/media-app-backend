const express = require("express");
const router = express.Router();

//@type      GET
//@route     /auth/login
//@desc      route to login page
//@access    PUBLIC
router.get("/login", (req, res) => {
  res.json({ loginpage: "Implement Login Page" });
});

//@type      GET
//@route     /auth/register
//@desc      route to register page
//@access    PUBLIC
router.get("/register", (req, res) => {
  res.json({ registerpage: "Implement Register Page" });
});

//@type      POST
//@route     /auth/register
//@desc      route to register user in DB
//@access    PRIVATE
router.post("/register", (req, res) => {
  res.json({ registerpage: "Store data in database" });
});

module.exports = { auth: router };
