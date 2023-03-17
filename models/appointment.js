const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [false, 'Please add a name']
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: false
    },
    doctor_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'doctor'
    },
    purpose: {
        type: String
    },
    status: {
        type: Boolean,
        default: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    }


},{ timestamps: true });

module.exports = mongoose.model('appointment', AppointmentSchema);