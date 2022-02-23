const express = require('express');
const { sendEmail, createUserEmail } = require("../controller/userEmail")
const router = express.Router();


router.post("/sendEmail/:id", sendEmail);
router.post("/createMail/", createUserEmail);


// router.post('/profile', requireSignin, (req, res) => {
//     res.status(constants.err.Success).json({ user: 'profile' })
// });

module.exports = router;