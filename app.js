require("dotenv/config");
const express = require("express");
const bodyparser = require("body-parser");
const app = express();

// bring all the routes
const { auth } = require("./routes/auth");

// use all the routes
app.use("/auth", auth);

// parsing incoming urls
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.json({ homepage: "Implement Home Page" });
});

app.listen(3000, () => console.log("Connected"));
