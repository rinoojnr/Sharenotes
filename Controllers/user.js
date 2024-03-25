const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../Models/user');



exports.userSignUp = (req,res) => {
    try{
        const { username, userphone, useremail, userpassword } = req.body;
        User.findOne({$or: [{username: username},{userphone: userphone},{useremail: useremail}]})
        .then(async(result) => {
            if(result) {
                res.status(200).json({ success: true, message: "user already exist"});
            } else{
                if(userpassword.length < 8){
                    throw new Error("password length must be grater than 8");
                } 
                const hashPssword = await bcrypt.hash(userpassword,Math.random());
                User.create({ username, userphone, useremail, userpassword: hashPssword })
                .then((result) => {
                    res.status(200).json({success: true, message: "user created"});
                })
                .catch((err) => {
                    res.status(400).json({success: false, message: "user creation failed", err: err.message});
                });
            }
        })
        .catch((err) =>{
            res.status(400).json({success: false, message: "user creation failed", err: err.message});
        }); 
    } catch(err) {
        res.status(400).json({success: false, message: "user creation failed", err: err.message});
    }
}