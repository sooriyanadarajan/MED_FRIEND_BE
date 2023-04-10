const User = require('../models/user')
var elasticemail = require('elasticemail');
const express = require('express')

var bodyParser = require('body-parser')

class DashboardController {
    constructor() { }

    async Dashboard(req, res) {
        let user = await User.countDocuments();

        let output = {
            user,
        }
        res.status(200).json({ success: true, message: 'Dashboard Details', data: output })
    }

    async sendMail(req, res) {

        const to = "akhilreddytaniparthi@gmail.com" ||  req.body.email
        const name = req.body.name
        const num = req.body.mobile
        const message = req.body.message
        var client = elasticemail.createClient({
            username: 'info.uptoz@gmail.com',
            apiKey: '2B682661630CC395424CE7A8960F6870A10223BB376CD1DDBD0B033482E49DED62BF8ABF867B29CDE5141CF5BA972875'
        });

        var msg = {
            from: 'info.uptoz@gmail.com',
            from_name: 'MED FRIEND',
            to: to,
            subject: 'Intimation Mail for View State',
            body_text: 'Hello Boss!, ' + name + ' tried to reach You ! , Please Contact Back (' + num + ') Message : ' + message
        };

        client.mailer.send(msg, function (err, result) {
            if (err) {
                return console.error(err);
            }
            res.status(200).json({ success: true, message: ''Email Sent Successfully', 'Result_id: ', result' })
            console.log('Email Sent Successfully', 'Result_id:', result);
        })
    }
    // async listAssets(req, res) {
    //     const limit = parseInt(req.body.limit)
    //     const page = parseInt(req.body.page)
    //     const skip = (page - 1) * limit
    //     let userids = [];
    //             if(req.body.key){
    //                 userids = await User.find({$or: 
    //                 [{name: { $regex: new RegExp(req.body.key, 'i') }}]}).distinct('_id');
    //             }
    //     let category = [];
    //             if(req.body.key){
    //                 category = await Category.find({$or: 
    //                 [{categoryname: { $regex: new RegExp(req.body.key, 'i') }}]}).distinct('_id');
    //             }
    //     const search = req.body.key
    //         ? {
    //             $or: [
    //                 { categorys: { $in : category }},
    //                 { user_id: { $in : userids }},                   
    //                 { imageName: { $regex: new RegExp(req.body.key, 'i')}}, 
    //                 { description: { $regex: new RegExp(req.body.key, 'i')}}
    //             ],
    //         deleted:false}
    //         : { 
    //             deleted:false
    //         };
    //     let list = await Asset.find(search).populate('collections').populate('categorys').populate('favorites').populate('user_id').sort({ createdAt: -1 }).skip(skip).limit(limit)
    //     let count = await Asset.countDocuments(search)
    //     let output = {
    //         list, count
    //     }
    //     res.status(200).json({ success: true, message: 'Recently Created Asset Listed', data: output })
    // }

    // async getAllTopAsset(req, res) {
    //     let list = await Asset.find({deleted:false}).populate('collections').populate('categorys').populate('favorites').sort({ "owners": -1 }).limit(10)
    //     res.status(200).json({ success: true, message: 'All Assets Listed', data: list })
    // }


}

module.exports = DashboardController