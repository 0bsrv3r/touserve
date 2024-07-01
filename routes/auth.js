const express  = require('express');
const router = express.Router();

const UserAuth = require("../controllers/userAuthController.js");
const CustomerAuth = require("../controllers/customerAuthController.js");
const userRegisterValidation  = require("../validators/user-registration.js"); 
const customerRegisterValidation  = require("../validators/customer-registration.js"); 

router.use(express.urlencoded({ extended:true }))

router.post("/user/register", userRegisterValidation, UserAuth.postRegister) 
router.post("/user/login", UserAuth.postLogin)
router.get("/user/sign-out", UserAuth.postSignOut)

router.post("/customer/register", customerRegisterValidation, CustomerAuth.postRegister)
router.post("/customer/login", CustomerAuth.postLogin)
router.get("/customer/sign-out", CustomerAuth.postSignOut)


module.exports = router