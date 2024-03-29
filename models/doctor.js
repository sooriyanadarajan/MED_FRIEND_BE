const mongoose = require('mongoose')

var doctorSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: false,
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
    },
    profile_image: {
        type: String,
        required: false,
    }
}, { timestamps: true });


var Doctor = mongoose.model('doctor', doctorSchema);

module.exports = Doctor;