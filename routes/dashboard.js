const express  = require('express');
const router = express.Router();
const login = require("../middlewares/auth.js")

router.use(express.urlencoded({ extended:true }))

router.get('/', login, (req, res) => { 
    res.render("./dashboard/dashboard", {layout: 'layouts/dashboard/top-side-bars'}); 
}); 

module.exports = router;