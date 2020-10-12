const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// load Person model
const Person = require("../models/Person");

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
  Person.findOne({ email: req.body.email })
    .then((person) => {
      if (person) {
        res.json({ alreadyexists: "User already Exists" });
      } else {
        const newperson = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        };
        if (req.body.userName) newperson.userName = req.body.userName;

        if (req.body.profilePic) newperson.profilePic = req.body.profilePic;

        if (req.body.gender) newperson.gender = req.body.gender;

        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newperson.password, salt, function (err, hash) {
            newperson.password = hash;
            const newPerson = new Person(newperson);
            newPerson
              .save()
              .then((person) => {
                res.json(person);
              })
              .catch((err) => console.log("Error while registering"));
          });
        });
      }
    })
    .catch((err) =>
      console.log("Error while checking wheater user in db or not")
    );
});

module.exports = { auth: router };
