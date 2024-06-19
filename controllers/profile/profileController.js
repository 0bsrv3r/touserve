const  { validationResult } = require("express-validator") 
const slugify = require("slugify")
const {Tours, Accommodations} = require("../../models")

class Profile{

    // Dashboard Side
    static async getYourData(req, res){
        const userId = {userId: 1} // {userId: req.session.user_id} //UPDATE THIS IN PROD ENV
        
        const accommodations = await Accommodations.findAll({where: userId})
        const tours = await Tours.findAll({where: userId})

        return res.render("./profile/profile", {layout: 'layouts/pagesheader.ejs', errors: {}, accommodations: accommodations, tours:tours });
    }
}

module.exports = Profile