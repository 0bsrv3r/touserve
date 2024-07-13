const  { validationResult } = require("express-validator") 
const {Accommodations, Tours, Customers, Sequelize} = require("../../models")
const FileUpload = require("./../../services/fileUploadService.js")
const UsersInfoReview = require("./../../services/usersInfoReviews.js")
const Entities = require("../../services/modelService.js")


class Accommodation{
    
    static async postAccommodation(req, res){
        const errors = validationResult(req)
        
        if(errors.isEmpty()){
            let images = await FileUpload.batchFileUpload(req, res, req.files.images, "upload/photos/accommodations/")
            
            const data = {
                customerId: req.session.user_id, // UPDATE THIS IN PROD ENV
                title: req.body.title, 
                accommodationType: req.body.accommodationType, 
                country: req.body.country, 
                city: req.body.city, 
                street: req.body.street, 
                price: req.body.price,
                currency: req.body.currency,
                in: req.body.in,
                out: req.body.out,
                amenities: req.body.amenities,
                roomCount: req.body.roomCount,
                bedCount: req.body.bedCount,
                bathCount: req.body.bathCount,
                guestCount: req.body.guestCount,
                roomType: req.body.roomType,
                rules: req.body.rules,
                promotions: req.body.promotions,
                weeklyDiscount: req.body.weeklyDiscount,
                monthlyDiscount: req.body.monthlyDiscount,
                about: req.body.about,
                images: images
            } 

            Accommodations.create(data)
            res.redirect('/customer/accommodations/create')
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})
            
            res.render("./profile/accommodation-create", {layout: 'layouts/pagesHeader', errors: errorObject, active:"accommodations"});  
        } 
    }

    static async getUpdateAccommodationById(req, res){
        const ids  = {
            id: req.params.id,
            customerId: req.session.user_id //UPDATE THIS IN PROD ENV
        }
        const accommodation  = await Accommodations.findOne({where: ids})

        if (accommodation) {
            res.render("./profile/accommodation-update", {layout: 'layouts/pagesHeader', accommodation: accommodation, errors: {}, active:"accommodations"});
        }else {
            res.status(404).json({ message: `Accommodation with ID ${ids.id} not found` });
        }
    }

    static async postUpdateAccommodationById(req, res){
        const errors = validationResult(req);
        const ids = {
            id: req.params.id,
            customerId: req.session.user_id  // UPDATE THIS IN PROD ENV
        }

        try {
            if(errors.isEmpty()){ 
                const accommodation = await Accommodations.findOne({where: ids});
                let oldImages  = accommodation.images
                
                if (accommodation) {
                    accommodation.title = req.body.title, 
                    accommodation.accommodationType = req.body.accommodationType, 
                    accommodation.country = req.body.country, 
                    accommodation.city = req.body.city, 
                    accommodation.street = req.body.street, 
                    accommodation.price = req.body.price,
                    accommodation.currency = req.body.currency,
                    accommodation.in = req.body.in,
                    accommodation.out = req.body.out,
                    accommodation.amenities = req.body.amenities,
                    accommodation.roomCount = req.body.roomCount,
                    accommodation.bedCount = req.body.bedCount,
                    accommodation.bathCount = req.body.bathCount,
                    accommodation.guestCount = req.body.guestCount,
                    accommodation.roomType = req.body.roomType,
                    accommodation.rules = req.body.rules,
                    accommodation.promotions = req.body.promotions,
                    accommodation.weeklyDiscount = req.body.weeklyDiscount,
                    accommodation.monthlyDiscount = req.body.monthlyDiscount,
                    accommodation.about = req.body.about

                    if (req?.files?.images) {
                        // Remove Old Images
                        await FileUpload.batchFileDelete(req, res, oldImages)

                        // Upload New Images
                        const images = await FileUpload.batchFileUpload(req, res, req.files.images, "upload/photos/accommodations/")
                        accommodation.images = images;                        
                    }

                    await accommodation.save();
                    res.redirect(`/customer/accommodations/update/${ids.id}`)
                } else {
                    res.status(404).json({ message: 'Accommodation not found' });
                }
            }else{
                const errorObject = errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
                    
                res.render("./profile/accommodation-update", {layout: 'layouts/pagesHeader', errors: errorObject, accommodation: {...req.body, id: req.params.id}, active:"accommodations"});                  
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while updating the accommodation' });
        }
    }

    static async deleteAccommoditionById(req, res){
        const ids = {
            id: req.params.id,
            customerId: req.session.user_id  //UPDATE THIS IN PROD ENV
        }

        const accommodations = await Accommodations.findOne({where:ids})
        const imagesPath = accommodations.images

        const deleted = await Accommodations.destroy({where: ids})

        if (deleted && accommodations) {
            // delete images
            await FileUpload.batchFileDelete(req, res, imagesPath)
            res.redirect('/customer/profile')
        }else {
            res.status(404).json({ message: `Accommodition with ID ${ids.id} not found` });
        }
    }

    // Front Side
    static async getRecommendedTours(req, res){
        const tours = await Entities.getEntities(Tours, "tourId", {order: 'totalStars DESC', limit:2},)
        return tours
    }
    
    static async getAccommodations(req, res){
        const accommodations = await Entities.getEntities(Accommodations, "accommodationId")
        const tours = await Accommodation.getRecommendedTours()
        
        return res.render('accommodation', {layout: 'layouts/pagesHeader', accommodations: accommodations, tours: tours, active:"accommodations" })
    }

    static async getAccommodationById(req, res){
        const data = req.params
        const accommodation = await Accommodations.findOne({
            where: data,
            attributes: {
                include: [
                    [Sequelize.literal(`(SELECT AVG(stars) FROM reviews WHERE reviews.accommodationId = Accommodations.id)`), 'totalStars']
                ]
            },
            include:['reviews', {model: Customers, as: 'customers', attributes: { exclude: ['password'] }}]
        })

        if(accommodation != undefined){
            // get users based on accommondation review
            const users = await UsersInfoReview.userInfoReviews(accommodation.reviews)

            return res.render('accommodation-details', {layout: 'layouts/pagesHeader', accommodation: accommodation, service:"accommodation", id:data.id, users: users, active:""})
        }else{
            return res.render("404", {layout: 'layouts/pagesheader', active:"accommodations"});
        }
    }
}

module.exports = Accommodation