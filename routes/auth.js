require("dotenv/config");
require("../.env");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const jsonwebtoken = require("jsonwebtoken");

// load Person model
const Person = require("../models/Person");

//@type      GET
//@route     /auth/login
//@desc      route to login page
//@access    PUBLIC
router.get("/login", (req, res) => {
  res.json({ loginpage: "Implement Login Page" });
});

//@type      POST
//@route     /auth/login
//@desc      route to login page
//@access    PUBLIC
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  Person.findOne({ email })
    .then((person) => {
      if (!person) return res.json({ loginError: "User not exists" });
      bcrypt.compare(password, person.password, (err, result) => {
        if (err) {
          throw err;
        }
        if (result) {
          const payload = {
            id: person.id,
            name: person.name,
            email: person.email,
          };
          jsonwebtoken.sign(
            payload,
            SECRET,
            { expiresIn: 60 * 60 },
            (err, token) => {
              if (err) {
                console.log(err);
              }
              res.json({
                token: "Nodejs " + token,
              });
            }
          );
        } else {
          res.json({ passwordError: "Password does not match" });
        }
      });
    })
    .catch((err) =>
      console.log("Error in Searching for user in Login Post route ")
    );
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
//@desc      route to register a user in DB
//@access    PUBLIC
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
        newperson.profilePic = "../public/user.png";
        if (req.body.gender) {
          newperson.gender = req.body.gender;
          if (newperson.gender == "male")
            newperson.profilePic = "../public/maleUser.png";
          else newperson.profilePic = "../public/femaleUser.png";
        }
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newperson.password, salt, function (err, hash) {
            newperson.password = hash;
            const newPerson = new Person(newperson);
            newPerson
              .save()
              .then((person) => {
                console.log("Saved to Database");
                res.json(person);
              })
              .catch((err) => console.log("Error while registering"));
          });
        });
      }
    })
    .catch((err) =>
      console.log("Error in checking for user while registering")
    );
});

//@type      GET
//@route     /auth/profile
//@desca     authenticated route to get users details
//@access    PRIVATE
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ user: req.user });
  }
);

module.exports = { auth: router };
