const express = require('express');
const router = express.Router();
const auth = require('./auth');
const user = require('./user');
const authMiddleware = require('../../middlewares/auth');

router.use('/auth', auth);
router.use('/user', user);
router.use('/user', authMiddleware);

module.exports = router;