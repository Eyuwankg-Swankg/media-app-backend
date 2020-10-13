const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
  },
  profilePic: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
    default: "",
  },
});

const Person = mongoose.model("mypeoples", PersonSchema);

module.exports = Person;
