const bcrypt = require("bcryptjs");

// NOTE Validation function
const validate = require("../validations/register");

//  NOTE Database
const db = require("../models");

// NOTE POST Register Route
const register = (req, res) => {
  const { errors, notValid } = validate(req.body);

  // NOTE Validate Form Data
  if (notValid) return res.status(400).json({ status: 400, errors });

  // NOTE Verify account doesn't already exists.
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err)
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again"
      });

    if (foundUser)
      return res.status(400).json({
        status: 400,
        errors: { email: "Email address has been taken. Please try again" }
      });

    // NOTE Generate Salt
    bcrypt.genSalt(10, (err, salt) => {
      if (err)
        return res.status(500).json({
          status: 500,
          message: "Something went wrong. Please try again."
        });

      // NOTE Hash User password
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err)
          return res.status(500).json({
            status: 500,
            message: "Something went wrong. Please try again."
          });

        // NOTE Create new user object to hold the new user information
        const newUser = {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: hash,
          role: req.body.role
        };

        // NOTE Create a new User record in MongoDB from the newUser object above
        db.User.create(newUser, (err, savedUser) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              status: 500,
              message: "Something went wrong. Please try again."
            });
          } else {
            res.cookie("user_id", savedUser._id, {
              path: "/"
            });
            res.cookie("role", savedUser.role, {
              path: "/"
            });

            res.send(savedUser);
          }
        });
      });
    });
  });
};

// NOTE POST Login route
const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ status: 400, message: "Please enter your email and password" });
  }

  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err)
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again."
      });

    if (!foundUser) {
      return res
        .status(400)
        .json({ status: 400, message: "Email or password is incorrect." });
    }

    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err)
        return res.status(500).json({
          status: 500,
          message: "Something went wrong. Please try again."
        });

      if (isMatch) {
        res.cookie("user_id", foundUser._id, {
          path: "/"
        });
        res.cookie("role", foundUser.role, {
          path: "/"
        });
        // return res.status(200).json({ status: 200, message: "Success", id: foundUser._id});
        return res.send(foundUser);
      } else {
        return res
          .status(400)
          .json({ status: 400, message: "Email or password is incorrect." });
      }
    });
  });
};

// NOTE POST Logout Route
const logout = (req, res) => {
  console.log("I am  loggin gout");
  req.session = null;
  res.clearCookie("user_id", { path: "/" });
  res.clearCookie("role", { path: "/" });

  res.sendStatus(200);
  // req.session.destroy(err => {
  //   if (err)
  //     return res.status(500).json({
  //       status: 500,
  //       message: "Somethign went wrong. Please try again"
  //     });
  //
  //   res.clearCookie("user_id", { path: "/" });
  //
  //   res.sendStatus(200);
  // });

  // req.session.destroy(err => {
  //   if (err)
  //     return res.status(500).json({
  //       status: 500,
  //       message: "Somethign went wrong. Please try again"
  //     });
  //
  //   res.sendStatus(200);
  // });
};

// NOTE GET Verify Route
const verify = (req, res) => {
  // if (!req.session.currentUser) {
  //     return res.status(401).json({ status: 401, message: "Unauthorized. Please login and try again"});
  // }

  res.status(200).json({
    status: 200,
    message: `Current user verified. User ID = ${req.session.currentUser.id}`
  });
};

module.exports = {
  register,
  login,
  logout,
  verify
};
