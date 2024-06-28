const express  = require('express');
const router = express.Router();

const Authentication = require("../controllers/loginController.js");
const CustomerAuth = require("../controllers/customerAuthController.js");
const registerValidation  = require("../validators/auth.js"); 
const customerRegisterValidation  = require("../validators/customer-registration.js"); 

router.use(express.urlencoded({ extended:true }))

router.post("/register", registerValidation, Authentication.postRegister) 
router.post("/login", Authentication.postLogin)

router.post("/customer/register", customerRegisterValidation, CustomerAuth.postRegister)
router.post("/customer/login", CustomerAuth.postLogin)


module.exports = router