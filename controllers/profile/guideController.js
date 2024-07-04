const {Customers} = require('./../../models') 

class Guides{

    static async deleteCompanyGuide(req, res){
        const ids = {
            id: req.params.id,
            companyId: 1 //req.session.user_id
        }

        await Customers.destroy({where: ids})

        res.redirect('/customer/profile')

    }
}

module.exports = Guides