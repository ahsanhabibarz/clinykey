var passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy;
// var GoogleStrategy = require("passport-google-oauth20").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const Client = mongoose.model("clients");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Client.findById(id).then(client => done(null, client));
});

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;

module.exports = passport => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: keys.appid,
        clientSecret: keys.appsecret,
        callbackURL: "http://localhost:5000/api/auth/facebook/callback",
        profileFields: [
          "id",
          "displayName",
          "picture.width(200).height(200)",
          "first_name",
          "middle_name",
          "last_name",
          "email"
        ]
      },
      function(accessToken, refreshToken, profile, done) {
        Client.findOne({ email: profile.emails[0].value }).then(client => {
          if (client) {
            //console.log("User:", client);
            done(null, client);
          } else {
            const newClient = new Client({
              name: profile.displayName,
              oid: profile.id,
              email: profile.emails[0].value
            });

            newClient
              .save()
              .then(newclient => done(null, newclient))
              .catch(err => console.log(err));
          }
        });
      }
    )
  );

  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: keys.gid,
  //       clientSecret: keys.gsec,
  //       callbackURL: "http://localhost:5000/api/auth/google/callback"
  //     },
  //     function(request, accessToken, refreshToken, profile, done) {
  //       console.log(profile.displayName);
  //       console.log(profile.id);
  //       console.log(profile.emails[0].value);
  //       return done(null, profile);
  //     }
  //   )
  // );

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Client.findOne({ email: jwt_payload.email })
        .then(client => {
          if (client) {
            return done(null, client);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
