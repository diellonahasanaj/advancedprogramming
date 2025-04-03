const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.post('/', userController.register);
router.get('/me', authenticate, userController.getCurrentUser);
router.get('/:id', authenticate, userController.getUser);
router.put('/:id', authenticate, userController.updateUser);

module.exports = router;