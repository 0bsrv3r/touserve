const express  = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended:true }))

const Authentication = require("../controllers/loginController.js");
const registerValidation  = require("../validators/auth.js"); 
// import {login} from "../middlewares/auth.js"; 

router.post("/register", registerValidation, Authentication.postRegister) 
router.post("/login", Authentication.postLogin) 

module.exports = router