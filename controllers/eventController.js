const  { validationResult } = require("express-validator") 
const slugify = require("slugify"); 
const { Events } = require("../models");
const fs = require('fs');
const path = require('path');

class Event{

    // Dashboard Side
    static async postEvent(req, res){
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
            
            const test = await Events.create(data)
            res.redirect('/dashboard/events-create')
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})
            
            res.render("./dashboard/events-create", {layout: 'layouts/dashboard/top-side-bars', errors: errorObject});  
        } 
    }

    static async getEventsByUserId(req, res){
        const user_id = {userId: 1} // req.session.user_id}
        const events = await Events.findAll({where: user_id})

        res.render("./dashboard/events", {layout: 'layouts/dashboard/top-side-bars', errors: {}, events: events });
    }

    static async deleteEventById(req, res){
        const id = req.params

        const events = await Events.findOne({where:id})
        const imagePath = events.image

        const deleted = await Events.destroy({where: id})

        if (imagePath) {
            const fullPath = path.join("./", imagePath);
            fs.unlink(fullPath, (err) => {
              if (err) {
                console.error(`Failed to delete image file: ${err}`);
                return res.status(500).send('Failed to delete image file');
              }
              console.log(`Deleted image file: ${fullPath}`);
            });
        }

        if (deleted) {
            res.redirect('/dashboard/events')
        }else {
            res.status(404).json({ message: `Event with ID ${id} not found` });
        }
    }


    // Front Side
    static async getEvents(req, res){
        const events = await Events.findAll()
        res.render("events", {layout: 'layouts/pagesheader', events:events});
    }
}

module.exports  = Event