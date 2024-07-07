const  { validationResult } = require("express-validator") 
const {Customers} = require('../models'); 
const JWTService = require("./../services/jwtService.js");
const EmailSender = require("./../services/emailService.js")

class Authentication {
    static async postRegister (req, res) { 
        const errors = validationResult(req); 
        
        if(errors.isEmpty()){ 

            try {
                const data = { 
                    uname: req.body.uname, 
                    email: req.body.email, 
                    password: req.body.password,
                    role: req.body.role,
                    verifiedAt: false,
                }

                const token  = await JWTService.generateToken(req.body.email, 'N/A')
                const invitationLink = `http://localhost:8181/auth/registration/accept?token=${token}`;
                await EmailSender.sendEmail(req, res, req.body.email, invitationLink)

                await Customers.create(data)
                return res.redirect('/');

            } catch (error) {
                return res.status(500).send(error);
            }
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})

            return res.render('register',{ errors: errorObject, layout: false }) 
        }
    }
    
    static async verifyEmail(req, res){
        const {token} = req.query
        const decoded = await JWTService.verifyToken(token)
        const customer = await Customers.findOne({where: {email:decoded.email}})

        if(customer){
            customer.verifiedAt = true
            await customer.save()
        }

        res.redirect("/")
    }

    static async postLogin(req, res){
        const data = { 
            uname: req.body.uname, 
            password: req.body.password,
            verifiedAt: "verified" 
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