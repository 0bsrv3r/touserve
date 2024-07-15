const express  = require('express');
const router = express.Router();
const  { validationResult } = require("express-validator") 
const slugify = require("slugify"); 
const { Events } = require("../../models");
const fs = require('fs');
const path = require('path');
const FileUpload = require("./../../services/fileUploadService.js")

class Event{

    // admin Side
    static async getEventsByUserId(req, res){
        const user_id = {userId: 1} // {userId: req.session.user_id} //UPDATE THIS IN PROD ENV
        const events = await Events.findAll({where: user_id})

        return res.render("./admin/events", {layout: 'layouts/admin/top-side-bars', errors: {}, events: events });
    }

    static async postEvent(req, res){
        const errors = validationResult(req); 
        if(errors.isEmpty()){
            let path = await FileUpload.singleFileUpload(req, res, req.files.image, "upload/photos/events/")
            
            const data = {
                userId: 1, // req.session.user_id, //UPDATE THIS IN PROD ENV
                title: req.body.title, 
                country: req.body.country, 
                city: req.body.city, 
                place: req.body.place, 
                date: req.body.date,
                description: req.body.description,
                image: path
            } 
            
            const event = await Events.create(data)
            return res.redirect('/admin/events/create')
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})
            
            return res.render("./admin/events-create", {layout: 'layouts/admin/top-side-bars', errors: errorObject});  
        } 
    }

    static async getUpdateEventById(req, res){
        const ids  = {
            id: req.params.id,
            userId: 1 // req.session.user_id //UPDATE THIS IN PROD ENV
        }
        const event  = await Events.findOne({where: ids})

        if (event) {
            return res.render("./admin/events-update", {layout: 'layouts/admin/top-side-bars', event: event, errors: {}});
        }else {
            return res.status(404).json({ message: `Event with ID ${ids.id} not found` });
        }
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
                    event.country = req.body.country;
                    event.city = req.body.city;
                    event.place = req.body.place;
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
                    return res.redirect(`/admin/events/update/${ids.id}`)
                } else {
                    return res.status(404).json({ message: 'Event not found' });
                }
            }else{
                const errorObject = errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
                    
                return res.render("./admin/events-update", {layout: 'layouts/admin/top-side-bars', errors: errorObject, event: {...req.body, id: req.params.id}});                  
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while updating the event' });
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
            return res.redirect('/admin/events')
        }else {
            return res.status(404).json({ message: `Event with ID ${ids.id} not found` });
        }
    }


    // Front Side
    static async getEvents(req, res){
        const events = await Events.findAll()
        return res.render("events", {layout: 'layouts/pagesheader', events:events, active:"events"});
    }
}

module.exports  = Event