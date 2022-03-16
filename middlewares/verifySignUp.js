const ROLES = ["user", "admin", "superAdmin"];

const Role = require('../models/Role');
const User = require('../models/User');

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    if (user) {
      res.status(200).json({ message: "Username is already in use!", status: 400 });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }

      if (user) {
        res.status(200).json({ message: "Email is already in use!", status: 400 });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    let temp = (req.body.roles);
    console.log(temp)
    if (temp) {
      for (let i = 0; i < temp.length; i++) {
        if (!ROLES.includes(temp[i])) {
          res.status(200).json({
            message: `Role ${temp[i]} does not exist!`,
            status: 400
          });
          return;
        }
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;