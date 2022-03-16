const express = require('express');
const router = express.Router();
const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controller/auth.controller");

// const { 
//     getUpcomingEvents,
// getPastEvents } = require('../controller/eventPagesController');


// router.get('/upcoming', getUpcomingEvents);
// router.get('/past', getPastEvents);


router.post(
  "/auth/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  controller.signup
);

router.post("/auth/signin", controller.signin);


// 
router.post("/auth/admin/signin", controller.adminSignin);

module.exports = router;












// module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

// };