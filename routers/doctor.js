const express = require('express')
// const adminAuth = require('../middleware/auth-admin')
const asyncHandler = require('../middlewares/async')

const DoctorController = require('../controllers/doctor')
const doctorController = new DoctorController();

const router = express.Router()


//Doctor API's
router.post('/create',  asyncHandler(doctorController.createDoctor))
router.get('/list',  asyncHandler(doctorController.listDoctor))
router.patch('/update',  asyncHandler(doctorController.updateDoctor))
router.delete('/delete/:id',  asyncHandler(doctorController.deleteDoctor))
router.get('/status/:id',  asyncHandler(doctorController.changeDoctorStatus))



module.exports = router