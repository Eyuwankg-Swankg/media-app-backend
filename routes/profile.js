const express = require("express");
const router = express.Router();
const passport = require("passport");

// load Profile model
const Profile = require("../models/Profile");

//@type      GET
//@route     /profile
//@desc      route to view user details
//@access    PRIVATE
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile)
          return res
            .status(404)
            .json({ profilenotfound: "User Profile not Found" });
        return res.json(profile);
      })
      .catch((err) => console.log("Error while getting user profile"));
  }
);

//@type      POST
//@route     /profile
//@desc      route to update profile
//@access    PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileValues = {
      user: req.user.id,
      email: req.user.email,
      social: {},
    };
    if (req.body.website) profileValues.website = req.body.website;
    if (req.body.country) profileValues.country = req.body.country;
    if (typeof req.body.languages != undefined)
      profileValues.languages = req.body.languages.split(",");
    if (req.body.portfolio) profileValues.portfolio = req.body.portfolio;
    if (req.body.facebook) profileValues.social.facebook = req.body.facebook;
    if (req.body.youtube) profileValues.social.youtube = req.body.youtube;
    if (req.body.instagram) profileValues.social.instagram = req.body.instagram;
    if (req.body.github) profileValues.social.github = req.body.github;
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileValues },
            {
              new: true,
            }
          )
            .then((profile) => {
              return res.json(profile);
            })
            .catch((err) => console.log("error while updating profile in DB"));
        } else {
          Profile.findOne({ username: req.body.username })
            .then((profile) => {
              if (profile) {
                return res.json({ alreadyexists: "Username already exists" });
              } else {
                profileValues.username = req.body.username;
                new Profile(profileValues)
                  .save()
                  .then((profile) => {
                    return res.json(profile);
                  })
                  .catch((err) =>
                    console.log("Error while saving Profile in DB")
                  );
              }
            })
            .catch((err) => console.log("Error while searching in DB"));
        }
      })
      .catch((err) => console.log("error while searching in Profile"));
  }
);

//@type      GET
//@route     /profile/all
//@desc      route to get all users profile
//@access    PRIVATE
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.find()
      .then((profiles) => {
        if (profiles) res.json(profiles);
        else res.json({ noprofile: "No profiles" });
      })
      .catch((err) => console.log("Error While searching for all profiles"));
  }
);

module.exports = router;
