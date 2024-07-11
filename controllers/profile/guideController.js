const {Customers, Sequelize, Tours } = require("../../models/index.js")
const UsersInfoReview = require("../../services/usersInfoReviews.js")
const ReviewStars = require("../../services/reviewStarService.js")

class Guide{
    
    static async deleteCompanyGuide(req, res){
        const ids = {
            id: req.params.id,
            companyId: 1 // req.session.user_id // UPDATE THIS IN PROD ENV
        }

        const guide = await Customers.findOne({where: ids})
        guide.companyId = null
        await guide.save()
        res.redirect('/customer/profile')
    }
    
    // Front Side
    static async getGuides(req, res){
        const guides = await Customers.findAll({
            where:{role:"guide", verifiedAt: true},
            attributes: {include:[[Sequelize.literal('(SELECT AVG(stars) FROM reviews WHERE reviews.guideId = Customers.id)'), 'totalStars']]},
            include: 'reviews',
            subQuery: false
        })

        if(guides != undefined){
            return res.render("guides", {layout: 'layouts/pagesheader', guides:guides, active:"guides"});
        }else{
            return res.render("guides", {layout: 'layouts/pagesheader', guides:{}, active:"guides"});
        }
    }

    static async getGuideById(req, res){
        const data = req.params
        const guide = await Customers.findOne({
            where: data, 
            include: [{model: Tours, as: 'guideTours',limit: 3,order: [['createdAt', 'DESC']]}, "reviews"]
        })

        const stars = await ReviewStars.starsCount(guide)
        
        if(guide != undefined){
            // get users based on guide review
            const users = await UsersInfoReview.userInfoReviews(req, res, guide.reviews)

            return res.render("guide-details", {layout: 'layouts/pagesheader', guide:guide, service:"guide", id:data.id, users: users, stars:stars, active:""});
        }else{
            return res.render("404", {layout: 'layouts/pagesheader', active:"guides"});
        }
    }
}

module.exports = Guide