const express  = require('express');
const router = express.Router();
const login = require("../middlewares/auth.js")

router.use(express.urlencoded({ extended:true }))

router.get('/', login, (req, res) => { 
    res.render("dashboard", {layout: false}); 
}); 

module.exports = router;