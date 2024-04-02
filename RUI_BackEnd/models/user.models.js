const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String },
  email: { type: String },
  role: { type: String },
  city: { type: String },
  birthDate: { type: Date },
  phoneNumber: { type: String },
});

const User = mongoose.model("User", userSchema);


module.exports = { User };
