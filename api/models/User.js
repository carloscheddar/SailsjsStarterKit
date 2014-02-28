/*
User

@module      :: Model
@description :: A short summary of how this model works and what it represents.
@docs		:: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require("bcrypt");

module.exports = {
  attributes: {
    email: {
      type: "string",
      // required: true, //Took this out because twitter api doesn't provide email
      unique: true,
    },
    username: {
      type: "string",
      // required: true, //Taking this out because there's probably an api that doesn't
                         //provide username
    },
    password: {
      type: "string",
      // required: true //Can't be required if using social networks
                        //to authenticate
    },
    toJSON: function() {
      var obj;
      obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeCreate: function(user, cb) {
    if (user.password) {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) {
            console.log(err);
            cb(err);
          } else {
            user.password = hash;
            cb(null, user);
          }
        });
      });
    }
    else cb(null, user);
  }
};