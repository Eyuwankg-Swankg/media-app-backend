const express = require("express");
const router = express.Router();
const passport = require("passport");

// load Profile model
const Profile = require("../models/Profile");

// load Person model
const Person = require("../models/Person");

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
    console.log(req.body);
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
                  .catch((err) => console.log(err));
              }
            })
            .catch((err) => console.log("Error while searching in DB"));
        }
      })
      .catch((err) => console.log("error while searching in Profile"));
  }
);

//@type      GET
//@route     /profile/user/:id
//@desc      route to get profile based on route
//@access    PRIVATE
router.get(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.params.id })
      .then((profile) => {
        if (!profile) res.json({ notfound: "Profile not found" });
        res.json(profile);
      })
      .catch((err) => console.log("Error while getting profile based on id"));
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

//@type      POST
//@route     /profile/workrole
//@desc      route to update workrole
//@access    PRIVATE
router.post(
  "/workrole",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const work = {
      role: req.body.role,
    };
    if (req.body.company) work.company = req.body.company;
    if (req.body.country) work.country = req.body.country;
    if (req.body.from) work.from = req.body.from;
    if (req.body.to) work.to = req.body.to;
    if (req.body.current) work.current = req.body.current;
    if (req.body.details) work.details = req.body.details;
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) res.status(404).json({ notfound: "Profile Not Found" });
        profile.workrole.unshift(work);
        profile
          .save()
          .then((profile) => res.json(profile))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log("Error while updating workrole"));
  }
);

//@type      DELETE
//@route     /profile/workrole/:id
//@desc      route to delete a particular workrole
//@access    PRIVATE
router.delete(
  "/workrole/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) res.json({ notfound: "Profile not found" });
        const Index = profile.workrole.findIndex(
          (work) => work.id == req.params.id
        );
        profile.workrole.splice(Index, 1);
        profile
          .save()
          .then((profile) => res.json(profile))
          .catch((err) => "Error while deleting workrole and saving profile");
      })
      .catch((err) => console.log("Error while deleting workrole"));
  }
);

//@type      GET
//@route     /profile/username
//@desc      route to get users profile based on username
//@access    PRIVATE
router.get(
  "/username/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ username: req.params.username })
      .then((profile) => {
        if (!profile) res.json({ notfound: "Profile not found" });
        res.json(profile);
      })
      .catch((err) =>
        console.log("Error while getting user based on username")
      );
  }
);

//@type      GET
//@route     /profile/user/:id
//@desc      route to delete a user and his/her profile
//@access    PRIVATE
router.delete(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndDelete({ user: req.user.id })
      .then((profile) => {
        Person.findByIdAndDelete(req.user.id)
          .then((person) => {
            res.json({ success: "User and Profile Deleted Successfully" });
          })
          .catch((err) => console.log("Error while deleting a user"));
      })
      .catch((err) => console.log("Error while deleting  profile"));
  }
);
module.exports = router;
