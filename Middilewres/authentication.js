const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()

exports.authentication = (req, res, next) => {
    try{
        const token = req.headers.authorization;
        console.log(token)
        const decoded = jwt.verify(token,process.env.SECRET_STRING);
        req.user = decoded;
        next();
    } catch(err){
        res.json({succsee: false, message: "user authentication failed"});
    }
}