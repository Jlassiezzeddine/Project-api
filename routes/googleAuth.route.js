<<<<<<< HEAD
const { OAuth2Client } = require('google-auth-library') ; 
const Admin = require('../models/Admin') ; 
const Customer = require('../models/Customer') ; 
const router = require('express').Router() ; 
const client = new OAuth2Client(process.env.CLIENT_ID) ; 
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).cookie("token", token, { httpOnly: true,maxAge :10000000 }).json({
      success: true,
      message: "Signed in with success",
    })
    
  };

router.post("/", async (req, res) => {
    const { token }  = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const { given_name,family_name, email, picture } = ticket.getPayload() ; 
    const user = await Customer.findOneAndUpdate({email},{$set:{firstName:given_name,lastName:family_name,email}},{upsert: true ,new:true }) ; 
    // const user = await Customer.findOneAndUpdate({email} , ) ; 
    await sendToken(user, 201, res);
   
    // res.json(user) ;  
    // const user = await .upsert({ 
    //     where: { email: email },
    //     update: { name, picture },
    //     create: { name, email, picture }
    // })
    // res.status(201)
    // res.json(user)
})
module.exports = router ; 
=======
const { OAuth2Client } = require("google-auth-library");
const Admin = require("../models/Admin");
const Customer = require("../models/Customer");
const router = require("express").Router();
const client = new OAuth2Client(process.env.CLIENT_ID);
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res
    .status(statusCode)
    .cookie("token", token, { httpOnly: true, maxAge: 10000000 })
    .json({
      success: true,
      message: "Signed in with success",
    });
};

router.post("/", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { given_name, family_name, email, picture } = ticket.getPayload();
  const user = await Customer.findOneAndUpdate(
    { email },
    { $set: { firstName: given_name, lastName: family_name, email } },
    { upsert: true, new: true }
  );
  // const user = await Customer.findOneAndUpdate({email} , ) ;
  await sendToken(user, 201, res);

  // res.json(user) ;
  // const user = await .upsert({
  //     where: { email: email },
  //     update: { name, picture },
  //     create: { name, email, picture }
  // })
  // res.status(201)
  // res.json(user)
});
module.exports = router;
>>>>>>> 370e0b5905322a6f2b081d33193f6d1be6a06c40
