const {Tours, Accommodations, Events, Customers} = require('./../models')
const Entities = require('./../services/modelService')

class Index{
    static async allServices(req, res){
        const tours  =  await Entities.getEntities(Tours, {order: ['totalStars', 'ASC'], limit:5})
        const accommodations  =  await Entities.getEntities(Accommodations, {order: ['totalStars', 'ASC'], limit:5})
        const guides  =  await Entities.getEntities(Customers, {where: {role:"guide", verifiedAt: true}, order: ['totalStars', 'ASC'], limit:5})
        
        return res.render("index", {layout: 'layouts/header', tours:tours, accommodations:accommodations, guides:guides})
    }
}

module.exports = Index