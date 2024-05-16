const express  = require('express');
const router = express.Router();

router.use(express.urlencoded({ extended:true }))

router.get('/', (req, res) => { 
    res.render("dashboard", {layout: false}); 
}); 

module.exports = router;