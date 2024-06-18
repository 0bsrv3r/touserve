const express  = require('express');
const router = express.Router();
const Profile = require("../controllers/profileController.js")

router.use(express.urlencoded({ extended:true }))

router.get('/', Profile.getYourData);
router.get('/tours/create', (req,res) => {res.render("./profile/tour-create", {layout: 'layouts/pagesheader.ejs', errors: {}});});


module.exports = router;