const db = require("../models");

const show = (req, res) => {
  const cookies = req.cookies;
  const currentUserId = cookies && cookies.user_id;

  db.User.findById(currentUserId, { password: 0, __v: 0 }, (err, foundUser) => {
    if (err)
      return res.status(500).json({
        status: 500,
        message: "Something went wrong. Please try again"
      });

    res.status(200).json({ status: 200, data: foundUser });
  });
};

const doctors = (req, res) => {
  db.User.find({ role: "doctor" }, (err, allUsers) => {
    if (err) return res.status(400).json({ status: 400, message: err });

    res.send(allUsers);
  });
};

module.exports = {
  show,
  doctors
};
