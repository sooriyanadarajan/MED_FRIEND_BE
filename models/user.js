const mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    userType:{
        type:String
    },
    roleType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
      //developer, tester, hr, tl, pl, 
    },
    logInStatus:{
        type:Boolean,
        default:false
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        minlength:8
    },
    token:{
        type: String
    }
})

var user = mongoose.model('user', userSchema);

module.exports = user;