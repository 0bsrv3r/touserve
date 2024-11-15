const  { validationResult } = require("express-validator")
require('dotenv').config();
const {Invitations, Customers} = require('./../models')
const JWTService = require('./../services/jwtService.js');
const EmailSender = require('./../services/emailService.js');


class Invitation{
    
    static async send(req, res){
        const email = req.body.email;
        const companyId = req.session.user_id // UPDATE THIS IN PROD ENV
        const token = await JWTService.generateToken(email, companyId)

        try {
            const guide = await Invitations.findOne({where: {email:email, companyId:companyId}})

            if(guide){
                guide.token = token
                await guide.save();
            }else{
                await Invitations.create({ email: email, companyId: companyId, token:token, status:"pending" });
            }

            // Send email
            const invitationLink = `${process.env.INVITATION_HOST}/invitation/accept?token=${token}`;
            EmailSender.sendEmail(email, invitationLink)

            return res.redirect('/customer/profile');
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    static async accept(req, res){
        const { token } = req.query;

        try {
            const decoded = await JWTService.verifyToken(token);
            const invitation = await Invitations.findOne({ where: { token } });
            const guide = await Customers.findOne({where: {email:decoded.email}})

            if (!invitation) {
                return res.status(400).send('Invalid invitation token');
            }else if(guide){
                guide.companyId = decoded.id
                await guide.save()
                await Invitations.destroy({ where: { token } });
                return res.redirect('/customer/profile');
            }

            return res.render('invitation-register', {layout: "layouts/pagesheader", token: token, active:""});

        } catch (error) {
            return res.status(400).send('Invalid or expired token');
        }
    }

    static async register(req, res){
        const { token, uname, password } = req.body;
        const errors = validationResult(req); 

        if(errors.isEmpty()){ 
            try {
                const decoded = JWTService.verifyToken(token);
                const invitation = await Invitations.findOne({ where: { token } });
    
                if (!invitation && decoded) {
                    return res.status(400).send('Invalid invitation token');
                }
                
                const newUser = await Customers.create({
                    companyId: invitation.companyId,
                    email: invitation.email,
                    uname,
                    password,
                    role: "guide",
                    verifiedAt: true
                });
    
                // Remove Invitation
                await Invitations.destroy({ where: { token } });
    
                res.redirect('/login');
            } catch (error) {
                res.status(400).send('Invalid or expired token');
            }
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})

            return res.status(403).json(errorObject) 
        }
    }
}

module.exports = Invitation