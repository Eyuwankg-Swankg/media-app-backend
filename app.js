require("dotenv/config");
require("./.env");
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const app = express();


// parsing incoming urls
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// connect to database
mongoose.connect(
  `mongodb+srv://eyuwankg:${DATABASE_URL}@cluster0.p44rz.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("DATABASE CONNECTED")
);

// bring all the routes
const { auth } = require("./routes/auth");

// use all the routes
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.json({ homepage: "Implement Home Page" });
});

app.listen(3000, () => console.log("App is Running at 3000"));
