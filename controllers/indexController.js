const {Tours, Accommodations, Events, Customers} = require('./../models')
const Entities = require('./../services/modelService')

class Index{
    static async allServices(req, res){
        const tours  =  await Entities.getEntities(Tours, "tourId", {order: 'totalStars DESC', limit:5})
        const accommodations  =  await Entities.getEntities(Accommodations, "accommodationId", {order: 'totalStars DESC', limit:5})
        const guides  =  await Entities.getEntities(Customers, 'guideId', {where: {role:"guide", verifiedAt: true}, order: 'totalStars DESC', limit:5})
        
        return res.render("index", {layout: 'layouts/header', tours: tours, accommodations: accommodations, guides: guides})
    }
}

module.exports = Index