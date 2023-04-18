const express = require('express')
// const adminAuth = require('../middleware/auth-admin')
const asyncHandler = require('../middlewares/async')
const auth = require('../middlewares/auth')


const AppointmentController = require('../controllers/appointment')
const appointmentController = new AppointmentController();

const router = express.Router()


//Doctor API's
router.post('/create',auth,  asyncHandler(appointmentController.createAppointment))
router.get('/list',  auth,asyncHandler(appointmentController.listAppointment))
router.patch('/update',  asyncHandler(appointmentController.updateAppointment))
router.delete('/delete/:id',  asyncHandler(appointmentController.deleteAppointment))
router.get('/status/:id',  asyncHandler(appointmentController.changeAppointmentStatus))



module.exports = router