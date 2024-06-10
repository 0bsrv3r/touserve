const express  = require('express');
const router = express.Router();
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
                userId: 1, // req.session.user_id, //UPDATE THIS IN PROD ENV
                title: req.body.title, 
                location: req.body.location, 
                date: req.body.date,
                description: req.body.description,
                image: path
            } 
            
            const event = await Events.create(data)
            res.redirect('/dashboard/events/create')
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})
            
            res.render("./dashboard/events-create", {layout: 'layouts/dashboard/top-side-bars', errors: errorObject});  
        } 
    }


    static async getEventsByUserId(req, res){
        const user_id = {userId: 1} // {userId: req.session.user_id} //UPDATE THIS IN PROD ENV
        const events = await Events.findAll({where: user_id})

        res.render("./dashboard/events", {layout: 'layouts/dashboard/top-side-bars', errors: {}, events: events });
    }


    static async getUpdateEventById(req, res){
        const ids  = {
            id: req.params.id,
            userId: 1 // req.session.user_id //UPDATE THIS IN PROD ENV
        }
        const event  = await Events.findOne({where: ids})

        if (event) {
            res.render("./dashboard/events-update", {layout: 'layouts/dashboard/top-side-bars', event: event, errors: {}});
        }else {
            res.status(404).json({ message: `Event with ID ${ids.id} not found` });
        }

        return event
    }

    static async postUpdateEventById(req, res){
        const errors = validationResult(req);
        const ids = {
            id: req.params.id,
            userId: 1 // req.session.user_id  // UPDATE THIS IN PROD ENV
        }
        
        try {
            if(errors.isEmpty() || errors.array()[0].msg == 'Image not uploaded' && !errors.array()[1]){ 
                const event = await Events.findOne({where: ids});
                const oldImage  = event.image
                
                if (event) {
                    event.title = req.body.title;
                    event.location = req.body.location;
                    event.date = req.body.date;
                    event.description = req.body.description;

                    if (req.files) {
                        // Remove Old Image
                        if (oldImage) {
                            const fullPath = path.join("./", oldImage);
                            fs.unlink(fullPath, (err) => {
                                if (err) {
                                    return res.status(500).send('Failed to delete image file');
                                }
                            });
                        }

                        // Upload New Image
                        let avatar = req.files.image; 
                        let newImagePath = 'upload/photos/events/' + Date.now() + '-' + slugify(avatar.name,{ 
                            lower: true, 
                            strict: true 
                        }) + '.' + avatar.name.split('.').pop();
                        avatar.mv(newImagePath, err => { 
                            if(err){ 
                                return res.status(500).send(err); 
                            } 
                        })
                                     
                        event.image = newImagePath;
                    }

                    await event.save();
                    res.redirect(`/dashboard/events/update/${ids.id}`)
                } else {
                    res.status(404).json({ message: 'Event not found' });
                }
            }else{
                const errorObject = errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
                
                res.render("./dashboard/events-update", {layout: 'layouts/dashboard/top-side-bars', errors: errorObject, event: req.body});                  
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while updating the event' });
        }
    }


    static async deleteEventById(req, res){
        const ids = {
            id: req.params.id,
            userId: 1 // req.session.user_id  //UPDATE THIS IN PROD ENV
        }

        const events = await Events.findOne({where:ids})
        const imagePath = events.image

        const deleted = await Events.destroy({where: ids})

        if (deleted && events) {
            if (imagePath) {
                const fullPath = path.join("./", imagePath);
                fs.unlink(fullPath, (err) => {
                  if (err) {
                    return res.status(500).send('Failed to delete image file');
                  }
                });
            }
            res.redirect('/dashboard/events')
        }else {
            res.status(404).json({ message: `Event with ID ${ids.id} not found` });
        }
    }


    // Front Side
    static async getEvents(req, res){
        const events = await Events.findAll()
        res.render("events", {layout: 'layouts/pagesheader', events:events});
    }
}

module.exports  = Event