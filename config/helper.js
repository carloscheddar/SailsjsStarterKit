// Load useful commands for the sails console

module.exports = {
  // Outputs a list of users matching the condition
  // If condition is empty then shows all users
  userWhere: function(condition) {
    User.find(condition).done(function(err, users) {
      console.log(users);
    });
  },
  // destroyAllUsers: function() {
  // },

  // Destroy single user
};