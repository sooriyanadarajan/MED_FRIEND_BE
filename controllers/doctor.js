const Doctor = require('../models/doctor')

class DoctorController {
    constructor() {

    }
    async createDoctor(req, res) {
        let create = await new Doctor(req.body).save();
        res.status(200).json({ success: true, message: 'Doctor Created', data: create })
    }


    async listDoctor(req, res) {
        let list = await Doctor.find({});
        res.status(200).json({ success: true, message: 'Doctor Listed', data: list })
    }

    
    async updateDoctor(req, res) {
        const categorys = await Doctor.findOne({ _id: req.body.id });
        const updates = Object.keys(req.body)
        updates.forEach((update) => categorys[update] = req.body[update])
        await categorys.save()
        res.status(200).json({ success: true, message: 'Doctor Updated', data: categorys })
    }


    async deleteDoctor(req, res) {
        let del = await Doctor.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true, message: 'Doctor Removed' })
    }


    async changeDoctorStatus(req, res) {
        let category = await Doctor.findOne({ _id: req.params.id });
        category.status = !category.status;
        await category.save();
        res.status(200).send({ success: true, message: "Status Changed " })
    }
}

module.exports = DoctorController