const express = require('express');
const { sendOTP, verifyOTP, userRegister, userLogin, userLogout } = require('../controllers/otpController');

const router = express.Router();

router.get('/sendOTP', sendOTP);
router.get('/verifyOTP', verifyOTP);
router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/logout', userLogout);

module.exports = router;