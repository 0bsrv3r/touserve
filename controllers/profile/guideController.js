const {Customers,Tours } = require("../../models/index.js")
const UsersInfoReview = require("../../services/usersInfoReviews.js")
const Entities = require("../../services/modelService.js")

class Guide{
    
    static async deleteCompanyGuide(req, res){
        const ids = {
            id: req.params.id,
            companyId: req.session.user_id // UPDATE THIS IN PROD ENV
        }

        const guide = await Customers.findOne({where: ids})
        guide.companyId = null
        await guide.save()
        res.redirect('/customer/profile')
    }
    
    // Front Side
    static async getGuides(req, res){
        const guides = await Entities.getEntities(Customers, { where:{role:"guide", verifiedAt: true}})

        if(guides != undefined){
            return res.render("guides", {layout: 'layouts/pagesheader', guides:guides, active:"guides"});
        }else{
            return res.render("guides", {layout: 'layouts/pagesheader', guides:{}, active:"guides"});
        }
    }

    static async getGuideById(req, res){
        const data = req.params
        const guide = await Entities.getOneEntity(Customers, data)

        let totalStars = 0

        for(const review of guide.reviews){
            totalStars = totalStars + review.stars
        }
        totalStars = totalStars/guide.reviews.length

        if(guide != undefined){
            // get users based on guide review
            const users = await UsersInfoReview.userInfoReviews(guide.reviews)
            const tours = await Entities.getEntities(Tours, {where: {guideId: guide.id}, limit:2})

            return res.render("guide-details", {layout: 'layouts/pagesheader', guide:guide, tours:tours, service:"guide", id:data.id, totalStars:totalStars, users: users, active:""});
        }else{
            return res.render("404", {layout: 'layouts/pagesheader', active:"guides"});
        }
    }
}

module.exports = Guide