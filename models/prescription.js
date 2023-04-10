const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: [false, 'Please add a name']
    },
    lastname: {
        type: String,
        required: [false, 'Please add a name']
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: false
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
    
    email: {
        type: String,
        required: false
    },
    phoneno: {
        type: Number,
        required: false
    }


}, { timestamps: true });

module.exports = mongoose.model('prescription', PrescriptionSchema);