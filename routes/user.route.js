const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authentication.middleware');

// import controller for index
const userController = require('../controllers/user.controller');

router.get('/', userController.home );
router.get('/me', authMiddleware.validToken, userController.me );
router.get('/listed', authMiddleware.validToken, userController.listed );

router.put('/me', authMiddleware.validToken, userController.update );
router.post('/listed',authMiddleware.validToken,userController.updatelisted );
module.exports = router;
