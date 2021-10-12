const User = require("../Modals/User");
const jwt = require("jsonwebtoken");
//handleerrors

const maxage = 3 * 24 * 60 * 60;
const handleErrors = (err) => {
  //the message property comes with the every
  //error code is like the unique error that exist
  //not  in all but in a specific error
  //like the duplication of the values
  //in that the values of err.code will be there
  // console.log(err.message, err.code);
  console.log(err.code, err.message);
  let errors = { email: "", password: "" };

  //incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That Email is not valid and Registered";
  }
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect!!";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
  }

  //validation errors
  if (err.message.includes("user validation failed")) {
    // Object.values(err.errors).forEach((error) => {
    //   console.log(error.properties);
    // });
    // console.log(object.values(err.errors));

    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(error.properties);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const createToken = (id) => {
  return jwt.sign({ id }, "rishabhverma", { expiresIn: maxage });
};

module.exports.signup_get = (req, res) => {
  res.render("signup");
};
module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxage });
    res.status(201).json({ user: user._id });
  } catch (error) {
    // res.status(400).send("error");
    const errors = handleErrors(error);

    // res.status(400).json(handleErrors(error));
    res.status(400).json({ errors });

    // handleErrors(error);
    // console.log(error);
  }
};
//we can do the like user.login
//but mongoose not comes with abality to come
// with ability like this
//we have to create  but also we cant create static method
//throw error can be accessed by error.message
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxage * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
