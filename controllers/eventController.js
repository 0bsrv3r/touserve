const  { validationResult } = require("express-validator") 
const slugify = require("slugify"); 
const { Events } = require("../models");

class Event{
    static postEvent(req, res){
        const errors = validationResult(req); 
        if(errors.isEmpty()){ 
            let avatar = req.files.image; 
            let path = 'upload/photos/events/' + Date.now() + '-' + slugify(avatar.name,{ 
                lower: true, 
                strict: true 
            }) + '.' + avatar.name.split('.').pop();
            avatar.mv(path, err => { 
                if(err){ 
                    return res.status(500).send(err); 
                } 
            })
            
            const data = {
                userId: req.session.user_id, 
                title: req.body.title, 
                location: req.body.location, 
                date: req.body.date,
                description: req.body.description,
                image: path
            } 
            
            Events.create(data)
            res.redirect('/dashboard/events')
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})

            res.render("./dashboard/events", {layout: 'layouts/dashboard/top-side-bars', errors: errorObject});  
        } 
    }

    static async getEvents(req, res){
        const events = await Events.findAll()
        res.render("events", {layout: 'layouts/pagesheader', events:events});
    }
}

module.exports  = Event