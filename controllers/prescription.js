const Prescription = require('../models/prescription')
var elasticemail = require('elasticemail');


class PrescriptionController {
    constructor() {

    }
    
    async createPrescription(req, res) {
        let create = await new Prescription(req.body).save();
        if(create){
        const to = req.body.email
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const num = req.body.mobileno
        const message = "We Received your Prescription kindly wait for next 24 hours ! We Will Reach Your Doorstep Shortly !!!"
        var client = elasticemail.createClient({
            username: 'info.uptoz@gmail.com',
            apiKey: '2B682661630CC395424CE7A8960F6870A10223BB376CD1DDBD0B033482E49DED62BF8ABF867B29CDE5141CF5BA972875'
        });

        var msg = {
            from: 'info.uptoz@gmail.com',
            from_name: 'MED FRIEND',
            to: to,
            subject: 'MED_FRIEND',
            body_text: 'Hello !, ' + firstname + lastname + ' tried to reach You ! , Please Contact Back (' + num + ') Message : '+message
        };

        client.mailer.send(msg, function (err, result) {
            if (err) {
                return console.error(err);
            }
            // res.send('Email Sent Successfully', 'Result_id: ', result)
            console.log('Email Sent Successfully', 'Result_id:', result);
        })
    }
        
        res.status(400).json({ success: true, message: 'Prescription Uploaded Successfully !', data: create })
    }

}

module.exports = PrescriptionController