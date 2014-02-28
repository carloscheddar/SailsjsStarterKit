/*
AuthController

@module      :: Controller
@description	:: A set of functions called `actions`.

Actions contain code telling Sails how to respond to a certain type of request.
(i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)

You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
and/or override them with custom routes (`config/routes.js`)

NOTE: The code you write here supports both HTTP and Socket.io automatically.

@docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require("passport");

module.exports = {
  login: function(req, res) {
    res.view("auth/login");
  },
  process: function(req, res) {
    console.log("In AuthController.process");
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        console.log("info:", info);
      }
      console.log("user:", user);
      if (err || (!user)) {
        console.log("Redirecting user to be created");
        res.redirect("/create");
        return;
      }
      req.login(user, function(err) {
        if (err) {
          res.redirect("/login");
        }
        return res.redirect("/");
      });
    })(req, res);
  },
  twitterLogin: function(req, res) {
    passport.authenticate('twitter')(req, res); //Not sure if this looks like sails
  },
  twitterProcess: function(req, res, next) {
    passport.authenticate('twitter',
      { successRedirect: '/',
        failureRedirect: '/login' })(req, res, next); //Not sure if this looks like sails
  },
  logout: function(req, res) {
    req.logout();
    res.send("logout successful");
  },
  _config: {}
};