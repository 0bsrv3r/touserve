const express  = require('express');
const router = express.Router();

const Authentication = require("../controllers/loginController.js");
const registerValidation  = require("../validators/auth.js"); 

router.use(express.urlencoded({ extended:true }))

router.post("/register", registerValidation, Authentication.postRegister) 
router.post("/login", Authentication.postLogin)

module.exports = router