const express = require("express");
const passport = require("passport");
const bodyparser = require("body-parser");
const router = express.Router();

// load Post Model
const { Post, savePost } = require("../models/Post");

//@type      POST
//@route     /post
//@desc      route to add post
//@access    PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const post = {
      user: req.user.id,
      heading: req.body.heading,
      caption: req.body.caption,
      img: req.body.img,
    };
    savePost(post)
      .then((post) => res.json(post))
      .catch((err) => console.log("Error while saving post in DB"));
  }
);

module.exports = router;
