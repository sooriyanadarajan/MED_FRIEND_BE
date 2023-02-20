const express = require('express')
const asyncHandler = require('../middlewares/async')

const UserController = require('../controllers/user')

const userController = new UserController();

const router = express.Router()

router.post('/user/signUp', asyncHandler(userController.singUp))
router.post('/user/logIn', asyncHandler(userController.logIn))
router.post('/logOut', asyncHandler(userController.logOut))
router.post('/os', asyncHandler(userController.findOs))
router.delete('/delete',asyncHandler(userController.delete))
// router.post('/user/user',asyncHandler(userController.findUserDetail))

module.exports = router