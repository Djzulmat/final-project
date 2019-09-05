const bcrypt = require('bcryptjs');

// NOTE Validation function
const validate = require('../validations/register');

//  NOTE Database
const db = require('../models');

// NOTE POST Register Route
const register = (req, res) => {
    const { errors, notValid } = validate(req.body);

    // NOTE Validate Form Data
    if (notValid) return res.status(400).json({ status: 400, errors });

    // NOTE Verify account doesn't already exists.
    db.User.findOne({ email: req.body.email}, (err, foundUser) => {
        if (err) return res.status(500).json({ status: 500, message: "Something went wrong. Please try again"});

        if (foundUser) return res.status(400).json({ status: 400, message: "Email address has been taken. Please try again"});

        // NOTE Generate Salt
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json({ status: 500, message: "Something went wrong. Please try again."});

            // NOTE Hash User password
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) return res.status(500).json({ status: 500, message: "Something went wrong. Please try again."});

                // NOTE Create new user object to hold the new user information
                const newUser = {
                    username: req.body.username,
                    email: req.body.email,
                    password: hash 
                }
                
                // NOTE Create a new User record in MongoDB from the newUser object above
                db.User.create(newUser, (err, savedUser) => {
                    if (err) res.send(err);

                    res.send(savedUser);
                })
            });
        });
    });
};

module.exports = {
    register,
};