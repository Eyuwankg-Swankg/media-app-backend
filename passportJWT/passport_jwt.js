require("dotenv/config");
require("../.env");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

//load person model
const Person = require("../models/Person");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Nodejs");
opts.secretOrKey = SECRET;
module.exports = (passport) =>
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      Person.findById(jwt_payload.id)
        .then((person) => {
          if (person) {
            return done(null, person);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => console.log("Error in checking JWT Auth"));
    })
  );
