const  { validationResult } = require("express-validator") 
const User = require('../models/user.js'); 

class Authentication {
    static postRegister (req, res) { 
        const errors = validationResult(req); 
        if(errors.isEmpty()){ 
            
            // model structure 
            const data = { 
                uname: req.body.uname, 
                email: req.body.email, 
                password: req.body.password,
                role: req.body.role
            } 

            User.create(data)
            res.redirect('/') 
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})

            res.render('register',{ errors: errorObject, layout: false }) 
        }
    }

    static async postLogin(req, res){
        const errors = validationResult(req);
        if(errors.isEmpty()){
            const data = { 
                uname: req.body.uname, 
                password: req.body.password, 
            } 

            const user = await User.findUser(data) 
            if(user != undefined){
                req.session.username = user.uname 
                req.session.user_id = user.id
                // console.log(req.session)
                res.redirect("/dashboard")
            }else{
                const errorObject = {
                    wrongAttempt: "Your username or password is incorrect"
                }
                res.render('login',{ errors: errorObject, layout: false })
            }
        }
    }
}
module.exports = Authentication