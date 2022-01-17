const express = require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");

const controller = require("../controller/order.controller");

router.post("/order/place", controller.place);
// router.post("/order/place", [authJwt.verifyToken], controller.place);

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