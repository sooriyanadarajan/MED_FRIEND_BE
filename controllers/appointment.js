const Appointment = require('../models/appointment')
var elasticemail = require('elasticemail');


class AppointmentController {
    constructor() {

    }
    
    async createAppointment(req, res) {
        let create = await new Appointment(req.body).save();
        var client = elasticemail.createClient({
            username: 'info.uptoz@gmail.com',
            apiKey: '2B682661630CC395424CE7A8960F6870A10223BB376CD1DDBD0B033482E49DED62BF8ABF867B29CDE5141CF5BA972875'
        });

        var msg = {
            from: 'info.uptoz@gmail.com',
            from_name: 'MED FRIEND',
            to: req.user.email,
            subject: 'Appointment created Successfully !!',
            body_text: 'Hai ' + req.user.name + 'Appointment Alloted Successfully Please be available on time '
        };

        client.mailer.send(msg, function (err, result) {
            if (err) {
                return console.error(err);
            }
            // res.send('OTP Sent Successfully', 'Result_id: ', result)
            console.log('appointment created', 'Result_id:', result);
        })
        res.status(200).json({ success: true, message: 'Appointment Schedulled !', data: create })
    }


    async listAppointment(req, res) {
        let list = await Appointment.find({}).populate('doctor_id');
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