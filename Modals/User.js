const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "Email is not Unique"],
    required: [true, "Enter the Email please"],
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Minimum length is the 6 characters "],
  },
});
//fire a function after the user get saved
//method is post means after a something
userSchema.post("save", function (doc, next) {
  console.log("new user was created", doc);
  next();
});

//fire a function defore a doc get saved
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  // console.log("user about to be created", this);
  next();
});

//static method to login
//it will find the user by email and return to us
//a whole user to compare password
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);
module.exports = User;
