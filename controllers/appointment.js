const Appointment = require('../models/appointment')

class AppointmentController {
    constructor() {

    }
    async createAppointment(req, res) {
        let create = await new Appointment(req.body).save();
        res.status(200).json({ success: true, message: 'Appointment Created', data: create })
    }


    async listAppointment(req, res) {
        let list = await Appointment.find({});
        res.status(200).json({ success: true, message: 'Appointment Listed', data: list })
    }

    
    async updateAppointment(req, res) {
        const categorys = await Appointment.findOne({ _id: req.body.id });
        const updates = Object.keys(req.body)
        updates.forEach((update) => categorys[update] = req.body[update])
        await categorys.save()
        res.status(200).json({ success: true, message: 'Appointment Updated', data: categorys })
    }


    async deleteAppointment(req, res) {
        let del = await Appointment.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true, message: 'Appointment Removed' })
    }


    async changeAppointmentStatus(req, res) {
        let category = await Appointment.findOne({ _id: req.params.id });
        category.status = !category.status;
        await category.save();
        res.status(200).send({ success: true, message: "Status Changed " })
    }
}

module.exports = AppointmentController