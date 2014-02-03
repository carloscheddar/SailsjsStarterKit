###
AuthController

@module      :: Controller
@description	:: A set of functions called `actions`.

Actions contain code telling Sails how to respond to a certain type of request.
(i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)

You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
and/or override them with custom routes (`config/routes.js`)

NOTE: The code you write here supports both HTTP and Socket.io automatically.

@docs        :: http://sailsjs.org/#!documentation/controllers
###

# Location: /api/controllers/AuthController.js
passport = require("passport")
module.exports =
  login: (req, res) ->
    res.view "auth/login"
    return

  process: (req, res) ->
    console.log "In AuthController.process"
    passport.authenticate("local", (err, user, info) ->
      console.log "info:", info
      console.log "user:", user
      if (err) or (not user)
        console.log "Redirecting user to be crated"
        res.redirect "/create"
        return
      req.logIn user, (err) ->
        res.redirect "/login"  if err
        res.redirect "/"

      return
    ) req, res
    return

  logout: (req, res) ->
    req.logout()
    res.send "logout successful"
    return

  _config: {}
