const {Customers} = require("../../models/index.js")
const UsersInfoReview = require("../../services/usersInfoReviews.js")

class Guide{

    static async deleteCompanyGuide(req, res){
        const ids = {
            id: req.params.id,
            companyId: 1 // req.session.user_id // UPDATE THIS IN PROD ENV
        }

        await Customers.destroy({where: ids})
        res.redirect('/customer/profile')
    }
    
    // Front Side
    static async getGuides(req, res){
        const guides = await Customers.findAll({where:{role:"guide"}})

        if(guides != undefined){
            return res.render("guides", {layout: 'layouts/pagesheader', guides:guides, active:"guides"});
        }else{
            return res.render("guides", {layout: 'layouts/pagesheader', guides:{}, active:"guides"});
        }
    }

    static async getGuideById(req, res){
        const data = req.params
        const guide = await Customers.findOne({where: data, include: ['guideTours', "reviews"] })
        
        if(guide != undefined){
            // get users based on guide review
            const users = await UsersInfoReview.userInfoReviews(req, res, guide.reviews)

            return res.render("guide-details", {layout: 'layouts/pagesheader', guide:guide, service:"guide", id:data.id, users: users, active:"guides"});
        }else{
            return res.render("404", {layout: 'layouts/pagesheader', active:"guides"});
        }
    }
}

module.exports = Guide