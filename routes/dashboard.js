const express  = require('express');
const router = express.Router();
const Event = require("../controllers/eventController.js")
const eventValidation  = require("../validators/event.js"); 

router.use(express.urlencoded({ extended:true }))

router.get('/', (req, res) => { 
    res.render("./dashboard/dashboard", {layout: 'layouts/dashboard/top-side-bars'}); 
});


router.get('/events', (req, res) => { 
    res.render("./dashboard/events", {layout: 'layouts/dashboard/top-side-bars', errors: {} }); 
});

router.post('/events',eventValidation, Event.postEvent);


router.get('/guides', (req, res) => {
    res.render("./dashboard/guides", {layout: 'layouts/dashboard/top-side-bars', errors: {} }); 
});

module.exports = router;