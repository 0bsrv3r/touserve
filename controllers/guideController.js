const {Customers, Tours} = require("../models")
const UsersInfoReview = require("./../services/usersInfoReviews.js")

class Guide{
    
    // Front Side
    static async getGuides(req, res){
        const guides = await Customers.findAll({where:{role:"guide"}})

        if(guides != undefined){
            return res.render("guides", {layout: 'layouts/pagesheader', guides:guides});
        }else{
            return res.render("guides", {layout: 'layouts/pagesheader', guides:{}});
        }
    }

    static async getGuideById(req, res){
        const data = req.params
        const guide = await Customers.findOne({where: data, include: ['guideTours', "reviews"] })
        
        if(guide != undefined){
            // get users based on guide review
            const users = await UsersInfoReview.userInfoReviews(req, res, guide.reviews)

            return res.render("guide-details", {layout: 'layouts/pagesheader', guide:guide, service:"guide", id:data.id, users: users});
        }else{
            return res.render("404", {layout: 'layouts/pagesheader'});
        }
    }
}

module.exports = Guide