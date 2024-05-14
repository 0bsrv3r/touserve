const express  = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended:true }))

const postRegister = require("../controllers/loginController.js");
// import {login} from "../middlewares/auth.js"; 

router.post("/", postRegister) 

module.exports = router