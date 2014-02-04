# Location: /config/passport.js
passport =      require("passport")
LocalStrategy = require("passport-local").Strategy
bcrypt =        require("bcrypt")


passport.serializeUser (user, done) ->
  done null, user[0].id
  return

passport.deserializeUser (id, done) ->
  User.findById id, (err, user) ->
    done err, user
    return

  return

passport.use new LocalStrategy((email, password, done) ->
  User.findByEmail(email).done (err, user) ->
    return done(null, err)  if err
    if not user or user.length < 1
      return done(null, false,
        message: "Incorrect User"
      )
    bcrypt.compare password, user[0].password, (err, res) ->
      unless res
        return done(null, false,
          message: "Invalid Password"
        )
      done null, user

    return

  return
)
module.exports = express:
  customMiddleware: (app) ->
    console.log "express midleware for passport"
    app.use passport.initialize()
    app.use passport.session()
    return
