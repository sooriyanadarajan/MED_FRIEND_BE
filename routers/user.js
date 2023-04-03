const express = require('express')
const auth = require('../middlewares/auth')
const asyncHandler = require('../middlewares/async')

const UserController = require('../controllers/user')

const userController = new UserController();

const router = express.Router()

router.post('/signUp', asyncHandler(userController.register))
router.post('/logIn', asyncHandler(userController.login))
router.get('/getProfile', auth, asyncHandler(userController.getUser))
router.get('/logOut', auth, asyncHandler(userController.logout))
router.post('/forgotPassword', asyncHandler(userController.forgotPassword))
router.post('/verifyPassword', asyncHandler(userController.verifyPassword))
router.post('/resetPassword', asyncHandler(userController.resetPassword))

module.exports = router