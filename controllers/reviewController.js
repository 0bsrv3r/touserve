const { validationResult } = require("express-validator")
const {Reviews} = require("../models")

class Review{

    static async postTourReview(req, res){
        const errors = validationResult(req)
        
        if(req.session.user_id){
            if(errors.isEmpty()){
                const data = {
                    userId: 1, // req.session.user_id, //UPDATE THIS IN PROD ENV
                    tourId: req.params.id, 
                    review: req.body.review, 
                    stars: req.body.stars,
                } 
    
                await Reviews.create(data)
                return res.redirect(`/tour-details/${req.params.id}`)
            }else{
                const errorObject = errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
                return res.json(errorObject)
            } 
        }else{
            return res.redirect('/login')
        }
    }

    static async deleteTourReviewById(req, res){
        const ids = {
            id: req.params.id,
            userId: 1 // req.session.user_id  //UPDATE THIS IN PROD ENV
        }
        const review = await Reviews.findOne({where:ids, attributes:["tourId"]})
        const deleted = await Reviews.destroy({where: ids})

        if (deleted) {
            return res.redirect(`/tour-details/${review.tourId}`)
        }else {
            return res.status(404).json({ message: `Reviews with ID ${ids.id} not found` });
        }
    }

    static async postGuideReview(req, res){
        const errors = validationResult(req)
        
        if(req.session.user_id){
            if(errors.isEmpty()){
                const data = {
                    userId: 1, // req.session.user_id, //UPDATE THIS IN PROD ENV
                    guideId: req.params.id, 
                    review: req.body.review, 
                    stars: req.body.stars,
                } 
    
                await Reviews.create(data)
                return res.redirect(`/guide-details/${req.params.id}`)
            }else{
                const errorObject = errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
                return res.json(errorObject)
            } 
        }else{
            return res.redirect('/login')
        }
    }

    static async deleteGuideReviewById(req, res){
        const ids = {
            id: req.params.id,
            userId: 1 // req.session.user_id  //UPDATE THIS IN PROD ENV
        }
        const review = await Reviews.findOne({where:ids, attributes:["guideId"]})
        const deleted = await Reviews.destroy({where: ids})

        if (deleted) {
            return res.redirect(`/guide-details/${review.guideId}`)
        }else {
            return res.status(404).json({ message: `Reviews with ID ${ids.id} not found` });
        }
    }
    
    static async postAccommodationReview(req, res){
        const errors = validationResult(req)
        
        if(req.session.user_id){
            if(errors.isEmpty()){
                const data = {
                    userId: 1, // req.session.user_id, //UPDATE THIS IN PROD ENV
                    accommodationId: req.params.id, 
                    review: req.body.review, 
                    stars: req.body.stars,
                } 
    
                await Reviews.create(data)
                return res.redirect(`/accommodation-details/${req.params.id}`)
            }else{
                const errorObject = errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
                return res.json(errorObject)
            } 
        }else{
            return res.redirect('/login')
        }
    }

    static async deleteAccommodationReviewById(req, res){
        const ids = {
            id: req.params.id,
            userId: 1 // req.session.user_id  //UPDATE THIS IN PROD ENV
        }
        const review = await Reviews.findOne({where:ids, attributes:["accommodationId"]})
        const deleted = await Reviews.destroy({where: ids})

        if (deleted) {
            return res.redirect(`/accommodation-details/${review.accommodationId}`)
        }else {
            return res.status(404).json({ message: `Reviews with ID ${ids.id} not found` });
        }
    }
}

module.exports = Review