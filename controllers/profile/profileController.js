const {Customers} = require("../../models")

class Profile{

    // Profile Side
    static async getYourData(req, res){
        const id = {id: 1} // {id: req.session.user_id} //UPDATE THIS IN PROD ENV
        const customer  = await Customers.findOne({where: id, include:["companyTours", "accommodations"]})

        return res.render("./profile/profile", {layout: 'layouts/pagesheader.ejs', errors: {}, customer: customer });
    }
}

module.exports = Profile