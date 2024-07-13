const  { validationResult } = require("express-validator")
require('dotenv').config(); 
const {Customers} = require('../models'); 
const JWTService = require("./../services/jwtService.js");
const EmailSender = require("./../services/emailService.js")
const ResetPassword = require("./../services/resetPasswordService.js");


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

                const customer = await Customers.findOne({where: {email: data.email}})

                if(customer){
                    const registered  = "You already registered. Please login"
                    return res.render('register',{ errors: {}, layout: false, registered: registered }) 
                }else{
                    const registered  = "You successfully registered. Confirmation link sent to your email"
                    const customer  = await Customers.create(data)
                    
                    const token  = await JWTService.generateToken(req.body.email, customer.id)
                    const invitationLink = `${process.env.INVITATION_HOST}/auth/customer/verify?token=${token}`;
                    await EmailSender.sendEmail(req.body.email, invitationLink)
                    
                    return res.render('register',{ errors: {}, layout: false, registered:registered }) 
                }
            } catch (error) {
                return res.status(500).send(error);
            }
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})

            return res.render('register',{ errors: errorObject, layout: false, registered:"" }) 
        }
    }
    
    static async verifyEmail(req, res){
        const {token} = req.query
        const decoded = await JWTService.verifyToken(token)
        const customer = await Customers.findOne({where: {email:decoded.email}})

        if(!customer.verifiedAt){
            customer.verifiedAt = true
            await customer.save()

            req.session.username = customer.uname 
            req.session.user_id = customer.id
            req.session.user_type = "customer"

            return res.redirect("/customer/profile")
        }

        return res.redirect("/")
    }

    static async postLogin(req, res){
        const {email, password} = req.body 
        const customer = await Customers.findOne({where: {email}})
        
        if(!customer){
            const errorObject = {
                wrongAttempt: "Your username or password is incorrect"
            }
            return res.render('login',{ errors: errorObject, layout: false })
        }

        const isValidPassword = await customer.validPassword(password)
        if(isValidPassword){
            if(customer.verifiedAt){
                req.session.username = customer.uname 
                req.session.user_id = customer.id
                req.session.user_type = "customer"

                return res.redirect("/customer/profile")
            }else{
                const errorObject = {
                    wrongAttempt: "Check your email & confirm you account"
                }
                const token  = await JWTService.generateToken(customer.email, customer.id)
                const invitationLink = `${process.env.INVITATION_HOST}/auth/customer/verify?token=${token}`;
                await EmailSender.sendEmail(customer.email, invitationLink)
                        
                return res.render('login',{ errors: errorObject, layout: false }) 
            }
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
    
    static async postAccountRecovery(req,res){
        const msg = "Password reset link successfully sent to your email address"
        await ResetPassword.accountRecovery(req, res, req.body.email, Customers, "customer")
        return res.render("account-recovery", {layout: 'layouts/pagesheader', msg:msg, type:"customer", active:""})
    }

    static async verifyToken(req, res){
        ResetPassword.verifyToken(req, res, req.query.token, "customer")
    }

    static async postPasswordReset(req, res){
        const errors = validationResult(req); 
        const {newPass1, token} = req.body

        if(errors.isEmpty()){
            ResetPassword.resetPassword(req, res, Customers, newPass1, token)
            res.redirect('/login');
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})

            return res.status(403).json(errorObject) 
        }
    }
}
module.exports = Authentication