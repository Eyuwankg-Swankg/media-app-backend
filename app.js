const express = require("express");
const bodyparser = require("body-parser");
const app = express();

// bring all the routes
const auth = require("./routes/auth");

// use all the routes
app.use("/auth", auth);

// seting up view engine
app.set("view engine", "ejs");

// parsing incoming urls
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.render("Home");
});

app.listen(3000, () => console.log("Connected"));
