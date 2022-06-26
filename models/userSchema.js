const  mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "Please enter a valid email",
    ],
  },

  password: { type: String, required: true },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
