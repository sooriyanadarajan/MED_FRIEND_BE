const User = require('../models/user')
// const UserActivity = require('../models/userActivity')
const bcrypt = require('bcryptjs')
class UserController {
    constructor() { }


    async singUp(req, res) {
        try {
            const { firstName, lastName, email, password, roleType } = req.body
            console.log(req.body)
            console.log(password)
            if (!req.body) {
                res.status(400).send("please fill the above detail")
            }

            const findEmail = await User.findOne({ email })
            console.log(findEmail)
            if (findEmail) {
                return res.status(400).send(`${email} is already used please another email`)
            }
            const salt = await bcrypt.genSalt(10)
            console.log(salt)
            const encryptedPassword = await bcrypt.hash(password, salt)
            console.log(encryptedPassword)
            const user = await User.create({
                firstName,
                lastName,
                email,
                password: encryptedPassword,
                roleType
            })
            // console.log(user)
            res.status(200).json({ success: true, data: user, message: "singup successfully" })
        } catch (error) {
            return error.message
        }
    }

    async logIn(req, res) {
        try {
            console.log(req.body)
            const { email, password } = req.body;

            // if (!req.body) {
            //     req.status(400).send("Please enter the email and password")
            // }
            const user = await User.findOne({ email }, { _id: 0 })
            console.log(user)
            if (!user) {
                return res.status(400).json({ message: "User Not Found" })
            }
            if (user && (await bcrypt.compare(password, user.password))) {
                let userStatus = await User.updateOne({ email: email }, {
                    logInStatus: true
                })
                console.log(userStatus)
                await new UserActivity(req.body).save();
                if (userStatus.acknowledged === true) {
                    let logInUser = await User.findOne({ email }, { _id: 0 })
                    console.log(logInUser)
                    return res.status(200).json({ success: true, data: logInUser, message: "login successfully" })
                }
                else {
                    return res.status(400).json({ message: "please veriry your password" })

                }
            }
        }
        catch (error) {
            return error.message
        }

    }

    async findOs() {
        let find_os = await
            // require os module

            // invoke userInfo() method

            // get uid property
            // from the userInfo object

            console.log(uid); // 20

    }
    // async findUserDetail(req,res){
    //     let table = await User.aggregate(
    //         [
    //             {
    //                 $match:{ _id: ObjectId(req.body._id)}
    //             },
    //             {
    //                 $lookup:{
    //                     from:"bugs",
    //                     localField:"_id",
    //                     foreignField:"to_id",
    //                     as:"buglist for user"
    //                 }
    //             },
                
    //         ]
    //     )
    //     // let table= await User.findById(req.body._id)
    //     return res.status(200).json({ success: true, data: table, message: "buglisted for user" })
    //  }

    async logOut(req, res) {
        try {
            const { email, password } = req.body;

            if (!req.body) {
                req.status(400).send("Please enter the email and password")
            }
            const user = await User.findOne({ email }, { _id: 0 })
            // user.login = true

            if (!user) {
                return res.status(400).json({ message: "please veriry your email" })
            }
            if (user && (await bcrypt.compare(password, user.password))) {
                let userStatus = await User.updateOne({ email: email }, {
                    logInStatus: false
                })
                if (userStatus.acknowledged === true) {
                    let logInUser = await User.findOne({ email }, { _id: 0 })

                    return res.status(200).json({ success: true, data: logInUser, message: "login successfully" })
                }
            }
            else {
                return res.status(400).json({ message: "please veriry your password" })

            }
        } catch (error) {
            return error.message
        }
    }



    async delete(req, res) {
        let remove = await User.deleteOne({ _id: req.body.id })
        return res.status(200).json({ success: true, data: remove, message: "deleted successfully" })

    }

}

module.exports = UserController