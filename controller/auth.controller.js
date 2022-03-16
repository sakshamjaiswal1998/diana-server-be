const config = require("../config/auth.config");
const User = require("../models/User");
const Role = require("../models/Role");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // console.log('req//body', req.body);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    if (req.body.roles) {
      let temp = (req.body.roles);
      if (temp) {
        Role.find(
          {
            name: { $in: temp }
          },
          (err, roles) => {
            if (err) {
              res.status(500).json({ message: err });
              return;
            }

            user.roles = roles.map(role => role._id);
            user.save(err => {
              if (err) {
                res.status(500).json({ message: err });
                return;
              }

              res.status(200).json({
                message: "User was registered successfully!",
                status: 200
              });
            });
          }
        );
      }
      else {
        console.log('non role / default');
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).json({ message: err });
            return;
          }

          user.roles = [role._id];
          user.save(err => {
            if (err) {
              res.status(500).json({ message: err });
              return;
            }

            res.status(200).json({
              message: "User was registered successfully!",
              status: 200
            });
          });
        });
      }
    }
    else {
      console.log('non role args');
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).json({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).json({ message: err });
            return;
          }

          res.status(200).json({
            message: "User was registered successfully!",
            status: 200
          });
        });
      });

    }
  });
};

exports.signin = (req, res) => {
  console.log('body', req.body);
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        console.log('err', err);
        res.status(500).json({ message: err });
        return;
      }

      if (!user) {
        return res.status(200).json({
          message: "User Not found.",
          status: 404
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(200).json({
          accessToken: null,
          message: "Invalid Password!",
          status: 401
        });
      }

      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        },
        status: 200
      });
    });
};
exports.adminSignin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        console.log('err', err);
        res.status(500).json({ message: err });
        return;
      }

      if (!user) {
        return res.status(200).json({
          message: "User Not found.",
          status: 404
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(200).json({
          accessToken: null,
          message: "Invalid Password!",
          status: 401
        });
      }
      console.log(user)
      if (user.roles[0].name == "admin" || user.roles[0].name == "superAdmin") {
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

        var authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).json({
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
          },
          status: 200
        });
      } else {
        res.status(400).json({
          message: "You are Not admin or SuperAdmin...!"
        })
      }

    });
};