const User = require('../models/user')
const bcrypt = require('bcryptjs')
var elasticemail = require('elasticemail');


class UserController {
    constructor() {

    }

    async register(req, res) {

        if (req.body.password === req.body.confirmPassword) {
            const user = new User(req.body)
            await user.save();
            var client = elasticemail.createClient({
                username: 'info.uptoz@gmail.com',
                apiKey: '2B682661630CC395424CE7A8960F6870A10223BB376CD1DDBD0B033482E49DED62BF8ABF867B29CDE5141CF5BA972875'
            });
    
            var msg = {
                from: 'info.uptoz@gmail.com',
                from_name: 'MED FRIEND',
                to: req.body.email,
                subject: 'Registration Successful !!',
                body_text: 'Hai ' + req.body.name + 'Registered Successfully Please login in your Account '
            };
    
            client.mailer.send(msg, function (err, result) {
                if (err) {
                    return console.error(err);
                }
                // res.send('OTP Sent Successfully', 'Result_id: ', result)
                console.log('OTP Sent Successfully', 'Result_id:', result);
            })
            return res.status(201).send({ success: true, data: user._id, message: 'Successfully Register' })
        }
        res.status(401).send({ success: false, message: "Password Mismatch" })

    }


    async login(req, res) {

        const user = await User.findByCredentials(req.body.email, req.body.password)
        if (user && user.status === false) {
            return res.status(401).send({ success: false, message: 'Your Account Has Been Disabled Please Contact Support Team ' })
        }
        const token = await user.generateAuthToken()
        return res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: false }).json({ success: true, message: "Login Successful" })

    }


    async getUser(req, res) {

        const user = await User.findOne({ _id: req.user._id });
        res.status(200).send({ success: true, data: user, message: 'User Info' })

    }


    async forgotPassword(req, res) {
        const user = await User.findOne({ email: req.body.email })
        console.log(user, 'uswer')
        let otp;
        var digits = '0123456789';
        let OTP = '';

        const to = req.body.email
        const name = user.name
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        console.log('forgot password otp:', OTP);
        user.otp = OTP
        await user.save()
        var client = elasticemail.createClient({
            username: 'info.uptoz@gmail.com',
            apiKey: '2B682661630CC395424CE7A8960F6870A10223BB376CD1DDBD0B033482E49DED62BF8ABF867B29CDE5141CF5BA972875'
        });

        var msg = {
            from: 'info.uptoz@gmail.com',
            from_name: 'MED FRIEND',
            to: to,
            subject: 'Forgot Password OTP',
            body_text: 'Hai ' + name + 'Please check the OTP :' + OTP
        };

        client.mailer.send(msg, function (err, result) {
            if (err) {
                return console.error(err);
            }
            // res.send('OTP Sent Successfully', 'Result_id: ', result)
            console.log('OTP Sent Successfully', 'Result_id:', result);
        })

        res.status(200).json({ success: true, message: 'otp send successfully, please check !' })

    }


    async verifyPassword(req, res) {
        let otp = req.body.otp
        const user = await User.findOne({ email: req.body.email })
        if (otp == user.otp) {
            user.otpverified = true
            await user.save();
            res.status(200).json({ success: true, message: 'OTP verified successfully' })
        }
    }


    async resetPassword(req, res) {
        const user = await User.findOne({ email: req.body.email })
        if (user.otpverified == true) {
            if (req.body.password === req.body.confirmPassword) {
                user.password = req.body.password
                user.otpverified = false
                await user.save()
                res.status(200).json({ success: true, message: 'Password changed successfully' })

            }
            res.status(200).json({ success: true, message: 'Please give the password and confirm password as same' })


        }
    }


    async logout(req, res, next) {

        const user = req.user
        res.clearCookie('token')
        await user.save()
        res.status(200).json({ success: true, message: 'Logout Success' })

    }

    async updateProfile(req, res, next) {

        const user = req.user
        const updates = Object.keys(req.body)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save();
        return res.status(200).json({ success: true, message: ' profile details updated '})
    }

}

module.exports = UserController