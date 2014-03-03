var passport         = require("passport")
  , LocalStrategy    = require("passport-local").Strategy
  , bcrypt           = require("bcrypt")
  , TwitterStrategy  = require("passport-twitter").Strategy
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
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

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
  function(email, password, done) {
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
      user = user[0];
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
    User.findOrCreate({
      username: profile.username
    },
    {
      username: profile.username,
      provider: profile.provider
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
 Passport Facebook Strategy
*/
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://127.0.0.1:1337/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({username: profile.username})
      .where({provider: profile.provider})
      .then(function(user) {
        if (user) {
          done(null, user);
        }
        else {
          console.log('profile: ', profile);
          return User.create({
            username: profile.username,
            provider: profile.provider
            });
        }
      }).then(function(user){
        done(null, user);
      }).fail(function(err) {
        console.log(err);
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