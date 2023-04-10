const Purpose = require('../models/purpose')

class PurposeController {
    constructor() {

    }
    
    async createPurpose(req, res) {
        let create = await new Purpose(req.body).save();
        res.status(200).json({ success: true, message: 'Purpose Created', data: create })
    }


    async listPurpose(req, res) {
        let list = await Purpose.find({});
        res.status(200).json({ success: true, message: 'Purpose Listed', data: list })
    }

    
    async updatePurpose(req, res) {
        const categorys = await Purpose.findOne({ _id: req.body.id });
        const updates = Object.keys(req.body)
        updates.forEach((update) => categorys[update] = req.body[update])
        await categorys.save()
        res.status(200).json({ success: true, message: 'Purpose Updated', data: categorys })
    }


    async deletePurpose(req, res) {
        let del = await Purpose.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true, message: 'Purpose Removed' })
    }


    async changePurposeStatus(req, res) {
        let category = await Appointment.findOne({ _id: req.params.id });
        category.status = !category.status;
        await category.save();
        res.status(200).send({ success: true, message: "Status Changed " })
    }

    
}

module.exports = PurposeController