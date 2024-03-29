const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require("../models/User");
const Role = require("../models/Role");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  //   console.log('TOK',token)

  if (!token) {
    return res.status(403).send({ message: "Access denied!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin" || roles[i].name === "superAdmin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Not enough provileges!" });
        return;
      }
    );
  });
};

// isModerator = (req, res, next) => {
//   User.findById(req.userId).exec((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }

//     Role.find(
//       {
//         _id: { $in: user.roles }
//       },
//       (err, roles) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }

//         for (let i = 0; i < roles.length; i++) {
//           if (roles[i].name === "moderator") {
//             next();
//             return;
//           }
//         }

//         res.status(403).send({ message: "Require Moderator Role!" });
//         return;
//       }
//     );
//   });
// };

const authJwt = {
  verifyToken,
  isAdmin,
  //   isModerator
};
module.exports = authJwt;