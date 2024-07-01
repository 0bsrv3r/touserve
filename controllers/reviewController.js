const { validationResult } = require("express-validator")
const {Reviews} = require("../models")

class Review{

    static async tourReview(req, res){
        const errors = validationResult(req)
        
        if(req.session.user_id){
            if(errors.isEmpty()){
                const data = {
                    userId: 2, // req.session.user_id, //UPDATE THIS IN PROD ENV
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

    static async guideReview(req, res){
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
    
    static async accommodationReview(req, res){
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
}

module.exports = Review