const express  = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended:true }))
const login = require("../middlewares/auth.js")

router.get('/', (req, res) => { 
    res.render("dashboard", login, {layout: false}); 
}); 

module.exports = router;