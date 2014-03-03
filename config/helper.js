// Load useful commands for the sails console

module.exports = {
  // Outputs a list of users matching the condition
  // If condition is empty then shows all users
  userWhere: function(condition) {
    User.find(condition).done(function(err, users) {
      console.log(users);
    });
  },

  // Look for a way to ask the user if they're sure about destroying
  destroyAllUsers: function() {
    User.find().done(function(err, users) {
      for (var user in users) {
        users[user].destroy(function(err) {
          if (err) {
            console.log(err);
          }
          else{
            console.log("Destroyed all users");
          }
        });
      }
    });
  },

  // Destroy single user
};