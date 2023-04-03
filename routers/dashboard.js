const express = require('express')
// const adminAuth = require('../middleware/auth-admin')
const asyncHandler = require('../middlewares/async')

const DashboardController = require('../controllers/dashboard')
const dashboardController = new DashboardController();

const router = express.Router()

// Dashboard API's
router.get('/dashboard', asyncHandler(dashboardController.Dashboard))
router.post('/contactUs', asyncHandler(dashboardController.sendMail))

module.exports = router