const {Customers, Tours, Sequelize } = require("../../models/index.js")
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
        const guides = await Entities.getEntities(Customers, "guideId", { where:{role:"guide", verifiedAt: true}})

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
            attributes: {
                include: [
                    [Sequelize.literal(`(SELECT AVG(stars) FROM reviews WHERE reviews.guideId = Customers.id)`), 'totalStars']
                ]
            }, 
            include: [{model: Tours, as: 'guideTours',limit: 3,order: [['createdAt', 'DESC']]}, "reviews"]
        })

        if(guide != undefined){
            // get users based on guide review
            const users = await UsersInfoReview.userInfoReviews(guide.reviews)

            return res.render("guide-details", {layout: 'layouts/pagesheader', guide:guide, service:"guide", id:data.id, users: users, active:""});
        }else{
            return res.render("404", {layout: 'layouts/pagesheader', active:"guides"});
        }
    }
}

module.exports = Guide