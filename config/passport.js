var passport = require("passport")
  , LocalStrategy = require("passport-local").Strategy
  , bcrypt = require("bcrypt")
  , TwitterStrategy = require("passport-twitter").Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , GitHubStrategy = require('passport-github').Strategy
  , GoogleStrategy = require('passport-google').Strategy;

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
    callbackURL: process.env.ROOT_URL + '/auth/twitter/callback'|| "http://127.0.0.1:1337/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    findOrCreate({
      username: profile.username,
      provider: profile.provider
    }
    , done);
  }
));

/*
 Passport Facebook Strategy
*/
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.ROOT_URL + '/auth/facebook/callback'|| "http://127.0.0.1:1337/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    findOrCreate({
      username: profile.username,
      provider: profile.provider
    }
    , done);
  }
));

/*
 Passport Google Strategy
*/
passport.use(new GoogleStrategy({
    returnURL: process.env.ROOT_URL + '/auth/google/callback'|| 'http://127.0.0.1:1337/auth/google/callback',
    realm: process.env.ROOT_URL || 'http://127.0.0.1:1337/'
  },
  function(identifier, profile, done) {
    findOrCreate({
      username: profile.displayName,
      // email: profile.emails[0].value,
      provider: 'google'
    }
    , done);
  }
));

/*
 Passport GitHub Strategy
*/
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.ROOT_URL + '/auth/github/callback'|| "http://127.0.0.1:1337/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    findOrCreate({
      username: profile.username,
      // email: profile.emails[0].value,
      provider: 'github'
    }
    , done);
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

/*
 Helper Functions
*/

findOrCreate = function(userValues, done) {
  User.findOne({
    username: userValues.username
  })
    .where({
      provider: userValues.provider
    })
    .then(function(user) {
      if (user) {
        return user;
      } else {
        return User.create(userValues);
      }
    }).then(function(user) {
      done(null, user);
    }).fail(function(err) {
      console.log(err);
    });
};