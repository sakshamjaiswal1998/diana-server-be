const express = require('express');
const { sendEmail, createUserEmail } = require("../controller/authenticEmail")
const router = express.Router();


router.post("/sendAuthenticMail", sendEmail);
router.post("/createAuthenticMail", createUserEmail);


// router.post('/profile', requireSignin, (req, res) => {
//     res.status(constants.err.Success).json({ user: 'profile' })
// });

module.exports = router;