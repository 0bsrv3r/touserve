const express  = require('express');
const router = express.Router();
const User = require("../controllers/profile/userController.js")
const profileValidation  = require("../validators/image-update.js"); 
const userValidation  = require("../validators/customer-user-update.js"); 

router.use(express.urlencoded({ extended:true }))

router.get('/profile', User.getProfileInfo);
router.post('/profile/photo', profileValidation, User.uploadProfilePhoto);

// Update Personal Information
router.post('/update/email', userValidation, User.updateEmail)
router.get('/verify/email', User.verifyEmail)
router.post('/update/number', userValidation, User.updateNumber)
router.post('/update/password', userValidation,  User.updatePassword)
router.post('/update/general', userValidation,  User.updateGeneral)

module.exports = router
