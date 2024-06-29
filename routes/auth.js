const express  = require('express');
const router = express.Router();

const UserAuth = require("../controllers/userAuthController.js");
const CustomerAuth = require("../controllers/customerAuthController.js");
const userRegisterValidation  = require("../validators/user-registration.js"); 
const customerRegisterValidation  = require("../validators/customer-registration.js"); 

router.use(express.urlencoded({ extended:true }))

router.post("/user/register", userRegisterValidation, UserAuth.postRegister) 
router.post("/user/login", UserAuth.postLogin)

router.post("/customer/register", customerRegisterValidation, CustomerAuth.postRegister)
router.post("/customer/login", CustomerAuth.postLogin)


module.exports = router