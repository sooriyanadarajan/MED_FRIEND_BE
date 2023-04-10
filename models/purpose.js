const mongoose = require('mongoose');

const PurposeSchema = new mongoose.Schema({

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
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: false
    }


}, { timestamps: true });

module.exports = mongoose.model('purpose', PurposeSchema);