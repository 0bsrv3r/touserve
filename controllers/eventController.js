const  { validationResult } = require("express-validator") 
const slugify = require("slugify"); 
const Events = require("../models/event.js")

class Event{
    static postEvent(req, res){
        // if(errors.isEmpty()){ 
            let avatar = req.files.image; 
            let path = 'upload/photos/' + Date.now() + '-' + slugify(avatar.name,{ 
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

            console.log(data)
        // } 
         
        // res.render('register',{ 
        //     errors: errors.array() 
        // }) 
    }
}

module.exports  = Event