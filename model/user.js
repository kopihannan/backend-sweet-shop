const mongoose = require("mongoose");

require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    unique: true,
  },
  password: { type: String, required: true, minlength: 6, maxlength: 100 },
});

const User = mongoose.model("User", userSchema);

exports.User = User;
