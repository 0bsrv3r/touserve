const express  = require('express');
const router = express.Router();

const AdminAuth = require("../controllers/admin/authController.js")
const UserAuth = require("../controllers/userAuthController.js");
const CustomerAuth = require("../controllers/customerAuthController.js");
const userRegisterValidation  = require("../validators/user-registration.js"); 
const customerRegisterValidation  = require("../validators/customer-registration.js"); 
const passwordResetValidation  = require("../validators/customer-user-update.js"); 

router.use(express.urlencoded({ extended:true }))

// Admin
router.get('/adm/login', (req, res) => {res.render("./admin/login", { errorMsg: "",layout: false})})
router.post('/admin/login', AdminAuth.postLogin)

// Users
router.post("/user/register", userRegisterValidation, UserAuth.postRegister) 
router.get("/user/verify", UserAuth.verifyEmail)
router.post("/user/login", UserAuth.postLogin)
router.get("/user/sign-out", UserAuth.postSignOut)
router.get('/user/account-recovery', (req, res) => {res.render("account-recovery", {layout: "layouts/pagesheader.ejs", type:"user", msg:"", active:""})})
router.post('/user/account-recovery', UserAuth.postAccountRecovery)
router.get('/user/reset-password', UserAuth.verifyToken)
router.post('/user/reset-password', passwordResetValidation, UserAuth.postPasswordReset)

// Customers
router.post("/customer/register", customerRegisterValidation, CustomerAuth.postRegister)
router.get("/customer/verify", CustomerAuth.verifyEmail)
router.post("/customer/login", CustomerAuth.postLogin)
router.get("/customer/sign-out", CustomerAuth.postSignOut)
router.get('/customer/account-recovery', (req, res) => {res.render("account-recovery", {layout: "layouts/pagesheader.ejs", type:"customer", msg:"", active:""})})
router.post('/customer/account-recovery', CustomerAuth.postAccountRecovery)
router.get('/customer/reset-password', CustomerAuth.verifyToken)
router.post('/customer/reset-password', passwordResetValidation, CustomerAuth.postPasswordReset)


module.exports = router