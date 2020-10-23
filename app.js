require("dotenv/config");
require("./.env");
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();

// bring all the routes
const { auth } = require("./routes/auth");
const profile = require("./routes/profile");
const post = require("./routes/post");

// connect to database
mongoose.connect(
  `mongodb+srv://eyuwankg:${DATABASE_URL}@cluster0.p44rz.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("DATABASE CONNECTED")
);

// parsing incoming urls
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// implement passport-jwt
app.use(passport.initialize());
require("./passportJWT/passport_jwt")(passport);

// use routes
app.use("/auth", auth);
app.use("/profile", profile);
app.use("/post", post);

//@type      GET
//@route     /
//@desc      route to Home Page
//@access    PUBLIC
app.get("/", (req, res) => {
  res.send("Implement Home Page");
});

app.listen(5000, () => console.log("App is Running at 5000"));
