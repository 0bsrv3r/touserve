const { validationResult } = require("express-validator")
const slugify = require("slugify")
const {Tours, Guides} = require("../models")

class Tour{

    // Dashboard Pages
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
                companyId: req.session.user_id, 
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
            res.redirect('/dashboard/tours')
        }else{
            return Tour.getGuideName(req, res, errors)
        } 
    }

    static async getGuideName(req, res, errors){

        const data = {companyId: req.session.user_id}
        const guideName = []  // await Guides.findAll({where: data})   //UPDATE THIS IN PROD ENV
        
        if(guideName != undefined){
            if(typeof errors !== 'function'){
                const errorObject = errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
                res.render("./dashboard/tours", {layout: 'layouts/dashboard/top-side-bars', guides:guideName, errors:errorObject });
            }else{
                res.render("./dashboard/tours", {layout: 'layouts/dashboard/top-side-bars', guides:guideName, errors:{} });
            }
        }else{
            res.render("./dashboard/tours", {layout: 'layouts/dashboard/top-side-bars', guides:{}, errors:{} });
        }
    }

    // Front Pages
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