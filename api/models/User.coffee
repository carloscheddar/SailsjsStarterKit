###
User

@module      :: Model
@description :: A short summary of how this model works and what it represents.
@docs		:: http://sailsjs.org/#!documentation/models
###
bcrypt = require("bcrypt")
module.exports =
  attributes:
    email:
      type: "string"
      required: true
      unique: true

    password:
      type: "string"
      required: true


    #Override toJSON method to remove password from API
    toJSON: ->
      obj = @toObject()

      # Remove the password object value
      delete obj.password


      # return the new object without password
      obj

  beforeCreate: (user, cb) ->
    bcrypt.genSalt 10, (err, salt) ->
      bcrypt.hash user.password, salt, (err, hash) ->
        if err
          console.log err
          cb err
        else
          user.password = hash
          cb null, user
        return

      return

    return

# When finished check if I can remove these returns