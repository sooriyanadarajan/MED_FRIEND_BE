const Doctor = require('../models/doctor')

const doctor = async () => {
    let check_item = [
        {username: 'Akhil Reddy', email: 'akhil@gmail.com'},
        {username: 'Sooriya', email: 'sooriya@gmail.com'},
        {username: 'Priya', email: 'priya@gmail.com'}
    ];
    for (let val of check_item) {
        let check_ex = await Doctor.findOne({ key: val.username });
        if (!check_ex) {
            await new Doctor(val).save();
        }
    }
    return true;
}

module.exports = {
    doctor
};