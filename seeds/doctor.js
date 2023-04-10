const Doctor = require('../models/doctor')

const doctor = async () => {
    let check_item = [
        {username: 'Akhil Reddy', email: 'akhil@gmail.com', profile_image: 'https://unsplash.com/photos/pTrhfmj2jDA'},
        {username: 'Sooriya', email: 'sooriya@gmail.com', profile_image: 'https://unsplash.com/photos/FVh_yqLR9eA'},
        {username: 'Priya', email: 'priya@gmail.com', profile_image: 'https://www.shutterstock.com/search/doctor'}
    ];
    for (let val of check_item) {
        let check_ex = await Doctor.findOne({ username: val.username });
        if (!check_ex) {
            await new Doctor(val).save();
        }
    }
    return true;
}

module.exports = {
    doctor
};