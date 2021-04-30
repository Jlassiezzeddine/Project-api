const { requestResetPassword } = require("../utils/testmail");

const router = require("express").Router();


router.post('/',requestResetPassword)


module.exports= router ; 

