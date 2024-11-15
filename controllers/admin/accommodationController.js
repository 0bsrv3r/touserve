const  { validationResult } = require("express-validator") 
const slugify = require("slugify")
const {Accommodations} = require("../../models")
const fs = require('fs');
const path = require('path');

class Accommodation{
    
    // admin Side
    static async getAccommodationsByUserId(req, res){
        const user_id = {customerId: 1} // {userId: req.session.user_id} //UPDATE THIS IN PROD ENV
        const accommodations = await Accommodations.findAll({where: user_id})

        return res.render("./admin/accommodations", {layout: 'layouts/admin/top-side-bars', errors: {}, accommodations: accommodations });
    }

    static postAccommodation(req, res){
        const errors = validationResult(req)
        
        if(errors.isEmpty()){
            let images = []
            
            for(let i=0; i<req.files.images.length; i++) {
                let avatar = req.files.images[i]; 
                let avatarPath = 'upload/photos/accommodations/' + Date.now() + '-' + slugify(avatar.name,{ 
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
                customerId: 1, // req.session.user_id, // UPDATE THIS IN PROD ENV
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
            return res.redirect('/admin/accommodations/create')
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})
            
            return res.render("./admin/accommodations-create", {layout: 'layouts/admin/top-side-bars', errors: errorObject});  
        } 
    }

    static async getUpdateAccommodationById(req, res){
        const ids  = {
            id: req.params.id,
            userId: 1 // req.session.user_id //UPDATE THIS IN PROD ENV
        }
        const accommodation  = await Accommodations.findOne({where: ids})

        if (accommodation) {
            return res.render("./admin/accommodations-update", {layout: 'layouts/admin/top-side-bars', accommodation: accommodation, errors: {}});
        }else {
            return res.status(404).json({ message: `Accommodation with ID ${ids.id} not found` });
        }
    }

    static async postUpdateAccommodationById(req, res){
        const errors = validationResult(req);
        const ids = {
            id: req.params.id,
            userId: 1 // req.session.user_id  // UPDATE THIS IN PROD ENV
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
                            let avatarPath = 'upload/photos/accommodations/' + Date.now() + '-' + slugify(avatar.name,{ 
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

                        accommodation.images = images;                        
                    }

                    await accommodation.save();
                    return res.redirect(`/admin/accommodations/update/${ids.id}`)
                } else {
                    return res.status(404).json({ message: 'Accommodation not found' });
                }
            }else{
                const errorObject = errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
                    
                return res.render("./admin/accommodations-update", {layout: 'layouts/admin/top-side-bars', errors: errorObject, accommodation: {...req.body, id: req.params.id}});                  
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while updating the accommodation' });
        }
    }

    static async deleteAccommoditionById(req, res){
        const ids = {
            id: req.params.id,
            userId: 1 // req.session.user_id  //UPDATE THIS IN PROD ENV
        }

        const accommodations = await Accommodations.findOne({where:ids})
        const imagesPath = accommodations.images

        const deleted = await Accommodations.destroy({where: ids})

        if (deleted && accommodations) {
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

            return res.redirect('/admin/accommodations')
            
        }else {
            return res.status(404).json({ message: `Accommodition with ID ${ids.id} not found` });
        }
    }
}

module.exports = Accommodation