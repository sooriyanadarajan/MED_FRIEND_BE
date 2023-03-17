const mongoose = require('mongoose')

var doctorSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        // required: true
    },
    role: {
        type: String,
        default: 'doctor',
        // enum: ['SUPERADMIN', 'ADMIN', 'SUBADMIN']
    },
    status: {
        type: Boolean,
        default: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });


var Doctor = mongoose.model('doctor', doctorSchema);

module.exports = Doctor;