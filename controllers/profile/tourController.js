const { validationResult } = require("express-validator")
const {Tours, Customers, Accommodations, Sequelize} = require("../../models")
const FileUpload = require("../../services/fileUploadService.js")
const UsersInfoReview = require("../../services/usersInfoReviews.js")
const Entities = require("../../services/modelService.js")


class Tour{

    // Profile  Pages
    static async getGuideName(req, res){
        const id = req.session.user_id  //UPDATE THIS IN PROD ENV
        const guide = await Customers.findAll({where: id})

        if(guide[0].role !== 'guide'){
            const companyId = req.session.user_id  //UPDATE THIS IN PROD ENV
            const guideNames =  await Customers.findAll({where: {companyId:companyId}})
            return guideNames
        }
        
        return guide
    }

    static async getTourCreate(req, res, errors){
        const guideNames = await Tour.getGuideName(req, res)

        if(guideNames != undefined){
            if(typeof errors !== 'function'){
                const errorObject = errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})

                return res.render("./profile/tour-create", {layout: 'layouts/pagesheader', guides:guideNames, errors:errorObject, active:"tours" });
            }else{
                return res.render("./profile/tour-create", {layout: 'layouts/pagesheader', guides:guideNames, errors:{}, active:"tours" });
            }
        }else{
            return res.render("./profile/tour-create", {layout: 'layouts/pagesheader', guides:{}, errors:{}, active:"tours" });
        }
    }

    static async postTour(req, res){
        const errors = validationResult(req)
        
        if(errors.isEmpty()){
            // Upload New Image
            const images = await FileUpload.batchFileUpload(req, res, req.files.images, "upload/photos/tours/")

            const data = {
                customerId: req.session.user_id, //UPDATE THIS IN PROD ENV
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
            return res.redirect('/customer/tours/create')
        }else{
            return Tour.getTourCreate(req, res, errors)
        } 
    }

    static async getUpdateTourById(req, res){
        const ids  = {
            id: req.params.id,
            customerId: req.session.user_id //UPDATE THIS IN PROD ENV
        }
        const tour  = await Tours.findOne({where: ids, include: "guides"})
        const guideNames = await Tour.getGuideName(req, res)

        if (tour) {
            return res.render("./profile/tour-update", {layout: 'layouts/pagesheader', tour: tour, guides:guideNames, errors: {}, active:"tours"});
        }else {
            return res.status(404).json({ message: `Tour with ID ${ids.id} not found` });
        }
    }

    static async postUpdateTourById(req, res){
        const errors = validationResult(req);
        const ids = {
            id: req.params.id,
            customerId: req.session.user_id  // UPDATE THIS IN PROD ENV
        }

        // Get Guides assiciated with Tour owner
        const guideNames = await Tour.getGuideName(req, res)

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
                        await FileUpload.batchFileDelete(req, res, oldImages)

                        // Upload New Image
                        const images = await FileUpload.batchFileUpload(req, res, req.files.images, "upload/photos/tours/")
                        tour.images = images;                        
                    }

                    await tour.save();
                    return res.redirect(`/customer/tours/update/${ids.id}`)
                } else {
                    return res.status(404).json({ message: 'Tour not found' });
                }
            }else{
                const errorObject = errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
                    
                return res.render("./profile/tour-update", {layout: 'layouts/pagesheader', errors: errorObject, tour: {...req.body, id: req.params.id}, guides: guideNames, active:"tours"});                  
            }
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while updating the tours' });
        }
    }

    static async deleteTourById(req, res){
        const ids = {
            id: req.params.id,
            customerId: req.session.user_id  //UPDATE THIS IN PROD ENV
        }

        const tours = await Tours.findOne({where:ids})
        const imagesPath = tours.images

        const deleted = await Tours.destroy({where: ids})

        if (deleted && tours) {
            await FileUpload.batchFileDelete(req, res, imagesPath)
            return res.redirect('/customer/profile')
        }else {
            return res.status(404).json({ message: `Tours with ID ${ids.id} not found` });
        }
    }

    // Front Side
    static async getTours(req, res){
        const tours = await Entities.getEntities(Tours, "tourId")

        return res.render("tours", {layout: 'layouts/pagesHeader', tours: tours, active:"tours"}); 
    }

    static async getTourById(req, res){
        const data = req.params
        const tour = await Tours.findOne({
            where: data, 
            attributes: {
                include: [
                    [Sequelize.literal(`(SELECT AVG(stars) FROM reviews WHERE reviews.tourId = Tours.id)`), 'totalStars']
                ]
            },
            include:"reviews"})
        
        if(tour != undefined){

            // get users based on tour review
            const users = await UsersInfoReview.userInfoReviews(tour.reviews)
            
            // get realted accommodations based on location
            const city = {city: tour.city}
            const accommodations = await Entities.getEntities(Accommodations, "accommodationId", {where:city, order: 'totalStars DESC', limit:3})
            
            return res.render("tour-details", {layout: 'layouts/pagesheader', tour:tour, accommodations: accommodations, service:"tour", id: data.id, users: users, active:""});
        }else{
            return res.render("404", {layout: 'layouts/pagesheader', active:"tours"});
        }
    }

    static async getTourByCategory(req, res){
        const data = req.params
        const tours = await Tours.findAll({where: data})

        if(tours[0] != undefined){
            return res.render(`${data.category}-tours`, {layout: 'layouts/pagesheader', tours:tours, active:"tours"});
        }else{
            return res.render("404", {layout: 'layouts/pagesheader', active:"tours"});
        }
    }
}

module.exports = Tour