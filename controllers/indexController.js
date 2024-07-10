const {Tours, Accommodations, Events, Customers} = require('./../models')

class Index{
    static async allServices(req, res){
        const tours  =  await Tours.findAll()
        const accommodations  =  await Accommodations.findAll()
        const guides  =  await Customers.findAll({where: {role:"guide", verifiedAt: true}})

        return res.render("index", {
            layout: 'layouts/header', 
            tours: tours, 
            accommodations: accommodations, 
            guides: guides})
    }
}

module.exports = Index