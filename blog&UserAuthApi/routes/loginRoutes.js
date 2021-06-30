const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/loginController');

router.post('/register',loginControllers.userRegister);
router.post('/login',loginControllers.userLogin);

module.exports = router;