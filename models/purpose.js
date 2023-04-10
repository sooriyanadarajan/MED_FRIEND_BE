const mongoose = require('mongoose');

const PurposeSchema = new mongoose.Schema({

    doctor_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'doctor'
    },
    purpose: {
        type: String
    },
    active: {
        type: Number,
        default: 0
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

module.exports = mongoose.model('purpose', PurposeSchema);