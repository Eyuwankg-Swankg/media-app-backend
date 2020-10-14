const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "myprofiles",
  },
  heading: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "myprofiles",
      },
      text: {
        type: String,
        required: true,
      },
      like: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "myprofiles",
          },
        },
      ],
      dislike: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "myprofiles",
          },
        },
      ],
    },
  ],
  like: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "myprofiles",
      },
    },
  ],
  dislike: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "myprofiles",
      },
    },
  ],
});

const Post = mongoose.model("mypost", PostSchema);

module.exports = {
  Post,
  savePost: async (post) => {
    return await new Post(post).save();
  },
};
