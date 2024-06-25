const  { validationResult } = require("express-validator") 
const slugify = require("slugify")
const {Tours, Accommodations} = require("../../models")

class Profile{

    // Profile Side
    static async getYourData(req, res){
        const customerId = {customerId: 1} // {userId: req.session.user_id} //UPDATE THIS IN PROD ENV
        
        const accommodations = await Accommodations.findAll({where: customerId})
        const tours = await Tours.findAll({where: customerId})

        return res.render("./profile/profile", {layout: 'layouts/pagesheader.ejs', errors: {}, accommodations: accommodations, tours:tours });
    }
}

module.exports = Profile