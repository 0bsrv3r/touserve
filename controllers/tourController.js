const { validationResult } = require("express-validator")
const slugify = require("slugify")
const {Tours, Guides} = require("../models")
const fs = require('fs')
const path = require('path')

class Tour{

    // Dashboard Pages
    static async getToursByUserId(req, res){
        const userId = {companyId: 1} // {userId: req.session.user_id} //UPDATE THIS IN PROD ENV
        const tours = await Tours.findAll({where: userId})

        res.render("./dashboard/tours", {layout: 'layouts/dashboard/top-side-bars', errors: {}, tours: tours });
    }

    static postTour(req, res){
        const errors = validationResult(req)
        
        if(errors.isEmpty()){

            let images = []
            for(let i=0; i<req.files.images.length; i++) {
                let avatar = req.files.images[i]; 
                let avatarPath = 'upload/photos/tours/' + Date.now() + '-' + slugify(avatar.name,{ 
                    lower: true, 
                    strict: true 
                }) + '.' + avatar.name.split('.').pop();
                avatar.mv(avatarPath, err => { 
                    if(err){ 
                        return res.status(500).send(err); 
                    } 
                })
                images.push(avatarPath)
            }

            let departure = req.body.date +' '+ req.body.time;
            const data = {
                companyId: 1, // req.session.user_id, //UPDATE THIS IN PROD ENV
                guideId: req.body.guide, 
                title: req.body.title, 
                category: req.body.category, 
                location: req.body.location, 
                departure: departure,
                duration: req.body.duration,
                highlights: req.body.highlights,
                inclusions: req.body.inclusions,
                currency: req.body.currency,
                price: req.body.price,
                overview: req.body.overview,
                additional: req.body.additional,
                images: images
            } 

            Tours.create(data)
            res.redirect('/dashboard/tours/create')
        }else{
            return Tour.getGuideName(req, res, errors)
        } 
    }

    static async getGuideName(req, res, errors){

        const data = {companyId: 1}   // req.session.user_id}  //UPDATE THIS IN PROD ENV
        const guideName =  await Guides.findAll({where: data})  
        
        if(guideName != undefined){
            if(typeof errors !== 'function'){
                const errorObject = errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
                res.render("./dashboard/tours-create", {layout: 'layouts/dashboard/top-side-bars', guides:guideName, errors:errorObject });
            }else{
                res.render("./dashboard/tours-create", {layout: 'layouts/dashboard/top-side-bars', guides:guideName, errors:{} });
            }
        }else{
            res.render("./dashboard/tours-create", {layout: 'layouts/dashboard/top-side-bars', guides:{}, errors:{} });
        }
    }

    static async getUpdateTourById(req, res){
        const ids  = {
            id: req.params.id,
            companyId: 1 // req.session.user_id //UPDATE THIS IN PROD ENV
        }
        const tour  = await Tours.findOne({where: ids, include: "guides"})

        // Get Guides assiciated with Tour owner
        const data = {companyId: 1}   // req.session.user_id}  //UPDATE THIS IN PROD ENV
        const guides =  await Guides.findAll({where: data})  

        if (tour) {
            res.render("./dashboard/tours-update", {layout: 'layouts/dashboard/top-side-bars', tour: tour, guides:guides, errors: {}});
        }else {
            res.status(404).json({ message: `Tour with ID ${ids.id} not found` });
        }
    }

    static async postUpdateTourById(req, res){
        const errors = validationResult(req);
        const ids = {
            id: req.params.id,
            companyId: 1 // req.session.user_id  // UPDATE THIS IN PROD ENV
        }

        // Get Guides assiciated with Tour owner
        const data = {companyId: 1}   // req.session.user_id}  //UPDATE THIS IN PROD ENV
        const guides =  await Guides.findAll({where: data})  

        try {
            if(errors.isEmpty()){ 
                const tour = await Tours.findOne({where: ids});
                let oldImages  = tour.images                
                let departure = req.body.date +' '+ req.body.time;

                if (tour) {
                    tour.guideId = req.body.guide, 
                    tour.title = req.body.title, 
                    tour.category = req.body.category, 
                    tour.location = req.body.location, 
                    tour.departure = departure,
                    tour.duration = req.body.duration,
                    tour.highlights = req.body.highlights,
                    tour.inclusions = req.body.inclusions,
                    tour.currency = req.body.currency,
                    tour.price = req.body.price,
                    tour.overview = req.body.overview,
                    tour.additional = req.body.additional

                    if (req?.files?.images) {
                        // Remove Old Image
                        if (oldImages) {
                            for(let oldImage of oldImages){
                                const imagePath = path.join("./", oldImage);
                                fs.unlink(imagePath, (err) => {
                                    if (err) {
                                        return res.status(500).send('Failed to delete image file');
                                    }
                                });
                            }
                        }

                        // Upload New Image
                        let images = []
                        for(let i=0; i<req.files.images.length; i++) {
                            let avatar = req.files.images[i]; 
                            let avatarPath = 'upload/photos/tours/' + Date.now() + '-' + slugify(avatar.name,{ 
                                lower: true, 
                                strict: true 
                            }) + '.' + avatar.name.split('.').pop();
                            avatar.mv(avatarPath, err => { 
                                if(err){ 
                                    return res.status(500).send(err); 
                                } 
                            })
                            images.push(avatarPath)
                        }

                        tour.images = images;                        
                    }

                    await tour.save();
                    res.redirect(`/dashboard/tours/update/${ids.id}`)
                } else {
                    res.status(404).json({ message: 'Tour not found' });
                }
            }else{
                const errorObject = errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
                    
                res.render("./dashboard/tours-update", {layout: 'layouts/dashboard/top-side-bars', errors: errorObject, tour: {...req.body, id: req.params.id}, guides: guides});                  
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while updating the accommodation' });
        }
    }

    static async deleteTourById(req, res){
        const ids = {
            id: req.params.id,
            companyId: 1 // req.session.user_id  //UPDATE THIS IN PROD ENV
        }

        const tours = await Tours.findOne({where:ids})
        const imagesPath = tours.images

        const deleted = await Tours.destroy({where: ids})

        if (deleted && tours) {
            if (imagesPath) {
                // delete image
                for(let singlePath of imagesPath){
                    const fullimagePath = path.join("./", singlePath);
                    fs.unlink(fullimagePath, (err) => {
                        if (err) {
                            return res.status(500).send('Failed to delete image file');
                        }
                    });
                }
            }

            res.redirect('/dashboard/tours')
            
        }else {
            res.status(404).json({ message: `Tours with ID ${ids.id} not found` });
        }
    }

    // Front Side
    static async getTours(req, res){
        const tours = await Tours.findAll()
        res.render("tours", {layout: 'layouts/pagesHeader', tours: tours}); 
    }

    static async getTourById(req, res){
        const data = req.params
        const tour = await Tours.findOne({where: data})
        if(tour != undefined){
            res.render("tour-details", {layout: 'layouts/pagesheader', tour:tour});
        }else{
            res.render("404", {layout: 'layouts/pagesheader'});
        }
    }

    static async getTourByCategory(req, res){
        const data = req.params
        const tours = await Tours.findAll({where: data})

        if(tours[0] != undefined){
            res.render(`${data.category}-tours`, {layout: 'layouts/pagesheader', tours:tours});
        }else{
            res.render("404", {layout: 'layouts/pagesheader'});
        }
    }
}

module.exports = Tour