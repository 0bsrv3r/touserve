const  { validationResult } = require("express-validator") 
const {Users} = require('../models'); 

class Authentication {
    static postRegister (req, res) { 
        const errors = validationResult(req); 
        if(errors.isEmpty()){ 
            
            // model structure 
            const data = { 
                uname: req.body.uname, 
                email: req.body.email, 
                password: req.body.password
            } 

            Users.create(data)
            res.redirect('/') 
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})

            return res.render('register',{ errors: errorObject, layout: false }) 
        }
    }

    static async postLogin(req, res){
        const data = { 
            uname: req.body.uname, 
            password: req.body.password, 
        } 

        const user = await Users.findOne({where: data}) 
        if(user != undefined){
            req.session.username = user.uname 
            req.session.user_id = user.id
            req.session.user_type = "user"
            return res.redirect("/user/profile")
        }else{
            const errorObject = {
                wrongAttempt: "Your username or password is incorrect"
            }
            return res.render('login',{ errors: errorObject, layout: false })
        }
    }

    static async postSignOut(req, res){
        req.session.destroy();
        res.redirect("/")
    }
}
module.exports = Authentication