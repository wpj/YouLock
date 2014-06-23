var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});


// methods

// generate hash
// userSchema.methods.generateHash = function(password) {

// }

// check if password is valid
// userSchema.methods.validPassword = function(password) {

// };

module.exports = mongoose.model('User', userSchema);