const { validationResult } = require("express-validator")
const {Reviews} = require("../models")

class Review{

    static async tourReview(req, res){
        // const errors = validationResult(req)
        
        // if(errors.isEmpty()){
            const data = {
                userId: 1, // req.session.user_id, //UPDATE THIS IN PROD ENV
                tourId: req.params.id, 
                review: req.body.review, 
                stars: req.body.stars,
            } 

            await Reviews.create(data)
            return res.redirect(`/tour-details/${req.params.id}`)
        // }else{
        //     return Tour.getTourCreate(req, res, errors)
        // } 
    }
}

module.exports = Review