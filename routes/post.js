const express = require("express");
const passport = require("passport");
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

//@type      GET
//@route     /post
//@desc      route to get all the post
//@access    PRIVATE
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.find()
      .then((posts) => {
        if (!posts) {
          res.status(404).json({ nopost: "No Post Found" });
        }
        res.json(posts);
      })
      .catch((err) => console.log(err));
  }
);

//@type      DELETE
//@route     /post/delete/:id
//@desc      route to delete a post
//@access    PRIVATE
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findByIdAndDelete(req.params.id)
      .then((post) => res.json(post))
      .catch((err) => console.log("Error while deleting a post"));
  }
);

module.exports = router;
