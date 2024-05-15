const express  = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended:true }))

const postRegister = require("../controllers/loginController.js");
const registerValidation  = require("../validators/auth.js"); 
// import {login} from "../middlewares/auth.js"; 

router.post("/", registerValidation, postRegister) 

module.exports = router