const {Admin} = require('../../models'); 


class Authentication {

    static async postLogin(req, res){
        const {uname, password} = req.body 
        const admin = await Admin.findOne({where: {uname:uname}})
        
        if(!admin){
            const errorMsg =  "Your username or password is incorrect"
            return res.render('./admin/login',{ errorMsg:errorMsg, layout: false })
        }

        const isValidPassword = await admin.validPassword(password)
        if(!isValidPassword){
            const errorMsg =  "Your username or password is incorrect"
            return res.render('./admin/login',{ errorMsg: errorMsg, layout: false })
        }
      
        req.session.username = admin.uname 
        req.session.user_id = admin.id
        req.session.user_type = "admin"

        return res.redirect("/admin")
    }
}

module.exports = Authentication