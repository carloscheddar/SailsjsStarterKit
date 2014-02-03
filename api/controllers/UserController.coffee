###
UserController

@module      :: Controller
@description	:: A set of functions called `actions`.

Actions contain code telling Sails how to respond to a certain type of request.
(i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)

You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
and/or override them with custom routes (`config/routes.js`)

NOTE: The code you write here supports both HTTP and Socket.io automatically.

@docs        :: http://sailsjs.org/#!documentation/controllers
###

###
Overrides for the settings in `config/controllers.js`
(specific to UserController)
###
module.exports =
  create: (req, res) ->
    console.log "Inside UserController.create"
    res.view 'user/create'
    return

  save: (req, res) ->
    console.log "Inside UserController.save"
    console.log req.body

    User.create(
      email: req.body.email
      password: req.body.password
      ).done (err, user) ->
      # Error handling
      if err
        console.log err

      # The User was created successfully!
      else
        console.log "User created:", user

    res.view 'examples/index'
    return

 _config: {}
