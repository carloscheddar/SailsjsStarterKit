var passport        = require("passport")
  , LocalStrategy   = require("passport-local").Strategy
  , bcrypt          = require("bcrypt")
  , TwitterStrategy = require("passport-twitter").Strategy;

passport.serializeUser(function(user, done) {
  console.log('serializer', user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


/*
 Passport Local Strategy
*/

passport.use(new LocalStrategy(function(email, password, done) {
  User.findByEmail(email).done(function(err, user) {
    if (err) {
      return done(null, err);
    }
    if (!user || user.length < 1) {
      return done(null, false, {
        message: "Incorrect User"
      });
    }
    bcrypt.compare(password, user[0].password, function(err, res) {
      if (!res) {
        return done(null, false, {
          message: "Invalid Password"
        });
      }
      return done(null, user);
    });
  });
}));

/*
 Passport Twitter Strategy
*/

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: "http://127.0.0.1:1337/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    console.log(profile);
    User.findOrCreate({
      username: profile.username
    },
    {
      username: profile.username
    },
    function(err, user) {
      if (err) {
        return done(err);
      }
      done(null, user);
    });
  }
));

/*
 Initialize Passport
*/

module.exports = {
  express: {
    customMiddleware: function(app) {
      console.log("express midleware for passport");
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};