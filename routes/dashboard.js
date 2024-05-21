const express  = require('express');
const router = express.Router();
const Event = require("../controllers/eventController.js")

router.use(express.urlencoded({ extended:true }))

router.get('/', (req, res) => { 
    res.render("./dashboard/dashboard", {layout: 'layouts/dashboard/top-side-bars'}); 
});

router.get('/events', (req, res) => { 
    res.render("./dashboard/events", {layout: 'layouts/dashboard/top-side-bars'}); 
});

router.post('/events', Event.postEvent);

module.exports = router;