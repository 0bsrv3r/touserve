const { validationResult } = require("express-validator")
const slugify = require("slugify")
const {Tours, Guides, Accommodations} = require("../../models")
const fs = require('fs')
const path = require('path')

class Tour{

    // Profile  Pages
    static async getGuideName(req, res){
        const data = {userId: 1}   // req.session.user_id}  //UPDATE THIS IN PROD ENV
        const guideNames =  await Guides.findAll({where: data})  
        return guideNames
    }

    static async getTourCreate(req, res, errors){

        const guideNames = await Tour.getGuideName()

        if(guideNames != undefined){
            if(typeof errors !== 'function'){
                const errorObject = errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})

                return res.render("./profile/tour-create", {layout: 'layouts/dashboard/top-side-bars', guides:guideNames, errors:errorObject });
            }else{
                return res.render("./profile/tour-create", {layout: 'layouts/pagesheader', guides:guideNames, errors:{} });
            }
        }else{
            return res.render("./profile/tour-create", {layout: 'layouts/pagesheader', guides:{}, errors:{} });
        }
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

            const data = {
                userId: 1, // req.session.user_id, //UPDATE THIS IN PROD ENV
                guideId: req.body.guide, 
                title: req.body.title, 
                tourType: req.body.tourType, 
                category: req.body.category, 
                country: req.body.country, 
                city: req.body.city, 
                area: req.body.area, 
                date: req.body.date, 
                time: req.body.time, 
                duration: req.body.duration,
                inclusions: req.body.inclusions,
                currency: req.body.currency,
                price: req.body.price,
                overview: req.body.overview,
                additional: req.body.additional,
                images: images
            } 

            Tours.create(data)
            return res.redirect('/profile/tours/create')
        }else{
            return Tour.getTourCreate(req, res, errors)
        } 
    }

    static async getUpdateTourById(req, res){
        const ids  = {
            id: req.params.id,
            userId: 1 // req.session.user_id //UPDATE THIS IN PROD ENV
        }
        const tour  = await Tours.findOne({where: ids, include: "guides"})
        const guideNames = await Tour.getGuideName()

        if (tour) {
            return res.render("./dashboard/tours-update", {layout: 'layouts/dashboard/top-side-bars', tour: tour, guides:guideNames, errors: {}});
        }else {
            return res.status(404).json({ message: `Tour with ID ${ids.id} not found` });
        }
    }

    static async postUpdateTourById(req, res){
        const errors = validationResult(req);
        const ids = {
            id: req.params.id,
            userId: 1 // req.session.user_id  // UPDATE THIS IN PROD ENV
        }

        // Get Guides assiciated with Tour owner
        const guideNames = await Tour.getGuideName()

        try {
            if(errors.isEmpty()){ 
                const tour = await Tours.findOne({where: ids});
                let oldImages  = tour.images 

                if (tour) {
                    tour.guideId = req.body.guide, 
                    tour.title = req.body.title, 
                    tour.tourType = req.body.tourType, 
                    tour.category = req.body.category, 
                    tour.country = req.body.country, 
                    tour.city = req.body.city, 
                    tour.area = req.body.area, 
                    tour.date = req.body.date, 
                    tour.time = req.body.time, 
                    tour.duration = req.body.duration,
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
                    return res.redirect(`/dashboard/tours/update/${ids.id}`)
                } else {
                    return res.status(404).json({ message: 'Tour not found' });
                }
            }else{
                const errorObject = errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
                    
                return res.render("./dashboard/tours-update", {layout: 'layouts/dashboard/top-side-bars', errors: errorObject, tour: {...req.body, id: req.params.id}, guides: guideNames});                  
            }
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while updating the accommodation' });
        }
    }

    static async deleteTourById(req, res){
        const ids = {
            id: req.params.id,
            userId: 1 // req.session.user_id  //UPDATE THIS IN PROD ENV
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

            return res.redirect('/dashboard/tours')
            
        }else {
            return res.status(404).json({ message: `Tours with ID ${ids.id} not found` });
        }
    }

    // Front Side
    static async getTours(req, res){
        const tours = await Tours.findAll()
        return res.render("tours", {layout: 'layouts/pagesHeader', tours: tours}); 
    }

    static async getTourById(req, res){
        const data = req.params
        const tour = await Tours.findOne({where: data})
        if(tour != undefined){
            const city = {city: tour.city}
            const accommodations = await Accommodations.findAll({where:city, order: [['createdAt', 'DESC']],limit: 3})
            
            return res.render("tour-details", {layout: 'layouts/pagesheader', tour:tour, accommodations: accommodations});
        }else{
            return res.render("404", {layout: 'layouts/pagesheader'});
        }
    }

    static async getTourByCategory(req, res){
        const data = req.params
        const tours = await Tours.findAll({where: data})

        if(tours[0] != undefined){
            return res.render(`${data.category}-tours`, {layout: 'layouts/pagesheader', tours:tours});
        }else{
            return res.render("404", {layout: 'layouts/pagesheader'});
        }
    }
}

module.exports = Tour