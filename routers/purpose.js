const express = require('express')
// const adminAuth = require('../middleware/auth-admin')
const asyncHandler = require('../middlewares/async')

const PurposeController = require('../controllers/purpose')
const purposeController = new PurposeController();

const router = express.Router()


//Doctor API's
router.post('/create',  asyncHandler(purposeController.createPurpose))
router.get('/list',  asyncHandler(purposeController.listPurpose))
router.patch('/update',  asyncHandler(purposeController.updatePurpose))
router.delete('/delete/:id',  asyncHandler(purposeController.deletePurpose))
router.get('/status/:id',  asyncHandler(purposeController.changePurposeStatus))



module.exports = router