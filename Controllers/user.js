const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const User = require('../Models/user');
const user = require('../Models/user');


function authentication(userid){
    return jwt.sign({ userid },process.env.SECRET_STRING);
}

dotenv.config();


exports.userSignUp = async(req,res) => {
    try {
        let userid;
        let existingUser;
        do {
            userid = parseInt(Math.random()*1000+Math.random()*9000);
            existingUser = await User.findOne({userid: userid});
        } while(existingUser);
        const { username, userphone, useremail, userpassword } = req.body;
        User.findOne({$or: [{username: username},{userphone: userphone},{useremail: useremail}]})
        .then(async(result) => {
            if(result) {
                res.status(200).json({ success: true, message: "user already exist"});
            } else {
                if(userpassword.length < 8){
                    throw new Error("password length must be grater than 8");
                } 
                const hashPssword = await bcrypt.hash(userpassword,Math.random());
                User.create({ userid, username, userphone, useremail, userpassword: hashPssword })
                .then((result) => {
                    res.status(200).json({success: true, message: "user created", token: authentication(result.userid)});
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


exports.userLogin = (req,res) => {
    try {
        const { username, password } = req.body;
        User.findOne({$or: [{username: username}, {userphone: username}, {useremail: username}]})
        .then((result) => {
            if(!result) {
                throw new Error("user not found")
            } else {
                bcrypt.compare(password,result.userpassword)
                .then((response) => {
                    if(response) {
                        res.status(200).json({success: true, message: "user logged", token: authentication(result.userid)})
                    } else {
                        throw new Error("password mismatch");
                    }
                })
                .catch((err) => {
                    res.status(400).json({success: false, message: "login failed", error: err.message});
                })
            }
        })
        .catch((err) => {
            res.status(400).json({success: false, message: "login failed", error: err.message});
        })

    } catch(err) {
        res.status(400).json({success: false, message: "login failed", error: err.message});
    }
    

}