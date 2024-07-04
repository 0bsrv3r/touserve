const  { validationResult } = require("express-validator") 
const {Customers} = require('../models'); 

class Authentication {
    static postRegister (req, res) { 
        const errors = validationResult(req); 
        if(errors.isEmpty()){ 
            const data = { 
                uname: req.body.uname, 
                email: req.body.email, 
                password: req.body.password,
                role: req.body.role
            } 

            Customers.create(data)
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

        const customer = await Customers.findOne({where: data}) 
        if(customer != undefined){
            req.session.username = customer.uname 
            req.session.user_id = customer.id
            req.session.user_type = "customer"
            return res.redirect("/customer/profile")
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