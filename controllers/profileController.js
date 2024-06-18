const  { validationResult } = require("express-validator") 
const slugify = require("slugify")
const {Tours, Accommodations} = require("../models")
const fs = require('fs');
const path = require('path');
const tour = require("../validators/tour");

class Profile{
    
    // Dashboard Side
    static async getYourData(req, res){

        const user_id = {userId: 1} // {userId: req.session.user_id} //UPDATE THIS IN PROD ENV
        const accommodations = await Accommodations.findAll({where: user_id})

        const userId = {userId: 1} // {userId: req.session.user_id} //UPDATE THIS IN PROD ENV
        const tours = await Tours.findAll({where: userId})

        res.render("./profile/profile", {layout: 'layouts/pagesheader.ejs', errors: {}, accommodations: accommodations, tours:tours });
    }
}

module.exports = Profile