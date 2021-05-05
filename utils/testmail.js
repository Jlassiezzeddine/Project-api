const JWT = require("jsonwebtoken");
const admin = require('../models/Admin')

const {sendEmail} = require("./email");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const ErrorHandler = require('../middlewares/error')
const {sendToken,unSetToken}= require('./auth')

const requestResetPassword = async(req,res,next)=>{
    const userMail = req.body.email
    try {
        const [user] = await admin.find({email: userMail}) ;
        console.log(user) ;  
        if (!user)
        {
            throw new ErrorHandler(404,'there is no user with this mail ')
        }  ; 
    
        let resetToken = user.getResetPasswordToken() ; 
        console.log(user._id) ; 
        const link = `http://localhost:7200/passwordReset?token=${resetToken}&id=${user._id}`;
        const message = await sendEmail(user.email,{link: link});
        res.status(200).json({
            success: true , 
            message 
        })
    }
    catch(err)
    {
        next(err)
    }
  


}

module.exports= {
    requestResetPassword
}