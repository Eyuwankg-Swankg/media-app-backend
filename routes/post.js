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
          res.json([]);
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

//@type      PATCH
//@route     /post/like/:id
//@desc      route to like a post
//@access    PRIVATE
router.patch(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (!post) {
          return res.json({ msg: "Post Not Found" });
        }
        const likeIndex = post.like.findIndex((i) => i.user == req.user.id);
        const dislikeIndex = post.dislike.findIndex(
          (i) => i.user == req.user.id
        );
        if (likeIndex != -1) post.like.splice(likeIndex, 1);
        else {
          if (dislikeIndex != -1) post.dislike.splice(dislikeIndex, 1);
          post.like.unshift({ user: req.user.id });
        }
        post
          .save()
          .then((post) => res.json(post))
          .catch((err) =>
            console.log("Error in saving post after updating like")
          );
      })
      .catch((err) =>
        console.console.log("Error while updating a likes to a post ")
      );
  }
);

//@type      PATCH
//@route     /post/dislike/:id
//@desc      route to dislike a post
//@access    PRIVATE
router.patch(
  "/dislike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (!post) {
          return res.status(404).json({ notfound: "Post Not Found" });
        }
        const dislikeIndex = post.dislike.findIndex(
          (i) => i.user == req.user.id
        );
        const likeIndex = post.like.findIndex((i) => i.user == req.user.id);
        if (dislikeIndex != -1) {
          post.dislike.splice(dislikeIndex, 1);
        } else {
          if (likeIndex != -1) post.like.splice(likeIndex, 1);
          post.dislike.unshift({ user: req.user.id });
        }
        post
          .save()
          .then((post) => res.json(post))
          .catch((err) =>
            console.log("Error in saving post after updating dislike")
          );
      })
      .catch((err) =>
        console.console.log("Error while updating a dislikes to a post ")
      );
  }
);

//@type      PATCH
//@route     /post/comment/:id
//@desc      route to add comment to a  post
//@access    PRIVATE
router.patch(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        if (!post) {
          return res.status(404).json({ notfound: "Post Not Found" });
        }
        post.comments.unshift({
          user: req.user.id,
          text: req.body.text,
        });
        post
          .save()
          .then((post) => res.json(post))
          .catch((err) => console.log("Error while saving comment in post "));
      })
      .catch((err) => console.like("Error while updating a comment in DB"));
  }
);

//@type      DELETE
//@route     /post/delcomment/:postid/:id
//@desc      route to delete a comment in post
//@access    PRIVATE
router.delete(
  "/delcomment/:postid/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.postid)
      .then((post) => {
        const commentIndex = post.comments.findIndex(
          (comment) => comment.id == req.params.id
        );
        if (commentIndex == -1)
          return res.json({ nocomment: "No Comment found" });
        post.comments.splice(commentIndex, 1);
        post
          .save()
          .then((post) => res.json(post))
          .catch((err) =>
            console.log("Error while saving post in DB after deleting comment")
          );
      })
      .catch((err) => console.log("Error while searching for a post in DB"));
  }
);

//@type      PUT
//@route     /post/likecomment/:postid/:commentid
//@desc      route to like a comment in a post
//@access    PRIVATE
router.put(
  "/likecomment/:postid/:commentid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.postid)
      .then((post) => {
        const commentIndex = post.comments.findIndex(
          (comment) => comment.id == req.params.commentid
        );
        const likeIndex = post.comments[commentIndex].like.findIndex(
          (like) => like.user == req.user.id
        );
        const dislikeIndex = post.comments[commentIndex].dislike.findIndex(
          (dislike) => dislike.user == req.user.id
        );
        if (likeIndex != -1) {
          post.comments[commentIndex].like.splice(likeIndex, 1);
        } else {
          if (dislikeIndex != -1)
            post.comments[commentIndex].dislike.splice(dislikeIndex, 1);
          post.comments[commentIndex].like.unshift({ user: req.user.id });
        }
        post
          .save()
          .then((post) => res.json(post))
          .catch((err) =>
            console.log("Error while updating likes in post comment")
          );
      })
      .catch((err) => console.log(err));
  }
);

//@type      PUT
//@route     /post/dislikecomment/:postid/:commentid
//@desc      route to dislike a comment in a post
//@access    PRIVATE
router.put(
  "/dislikecomment/:postid/:commentid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.postid)
      .then((post) => {
        const commentIndex = post.comments.findIndex(
          (comment) => comment.id == req.params.commentid
        );
        const likeIndex = post.comments[commentIndex].like.findIndex(
          (like) => like.user == req.user.id
        );
        const dislikeIndex = post.comments[commentIndex].dislike.findIndex(
          (dislike) => dislike.user == req.user.id
        );
        if (dislikeIndex != -1) {
          post.comments[commentIndex].dislike.splice(dislikeIndex, 1);
        } else {
          if (likeIndex != -1)
            post.comments[commentIndex].like.splice(likeIndex, 1);
          post.comments[commentIndex].dislike.unshift({ user: req.user.id });
        }
        post
          .save()
          .then((post) => res.json(post))
          .catch((err) =>
            console.log("Error while updating dislikes in post comment")
          );
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
