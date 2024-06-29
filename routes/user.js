const express  = require('express');
const router = express.Router();
const User = require("../controllers/profile/userController.js")
const profileValidation  = require("../validators/image-update.js"); 

router.use(express.urlencoded({ extended:true }))

router.get('/profile', User.getProfileInfo);
router.post('/profile/photo', profileValidation, User.uploadProfilePhoto);

module.exports = router
