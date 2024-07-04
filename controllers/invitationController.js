require('dotenv').config();
const  { validationResult } = require("express-validator") 
const jwt = require('jsonwebtoken');
const {Invitations, Customers} = require('./../models')
const EmailSender = require('./../services/emailService.js')

const JWT_SECRET = process.env.JWT_SECRET;

class Invitation{
    
    static async send(req, res){
        const email = req.body.email;
        const companyId = 1 // req.session.user_id
        const token = jwt.sign({ email, companyId }, JWT_SECRET, { expiresIn: '5m' });

        try {
            const guide = await Invitations.findOne({where: {email:email, companyId:companyId}})
            console.log(guide)

            if(guide){
                guide.token = token
                await guide.save();
            }else{
                await Invitations.create({ email: email, companyId: companyId, token:token, status:"pending" });
            }

            // Send email
            const invitationLink = `http://localhost:8181/invitation/accept?token=${token}`;
            EmailSender.sendEmail(req, res, email, invitationLink)

            return res.redirect('/customer/profile');
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    static async accept(req, res){
        const { token } = req.query;

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const invitation = await Invitations.findOne({ where: { token } });

            if (!invitation) {
                return res.status(400).send('Invalid invitation token');
            }
    
            return res.render('invitation-register', {layout: "layouts/pagesheader", token: token});
        } catch (error) {
            return res.status(400).send('Invalid or expired token');
        }
    }

    static async register(req, res){
        const { token, uname, password } = req.body;
        const errors = validationResult(req); 

        if(errors.isEmpty()){ 
            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                const invitation = await Invitations.findOne({ where: { token } });
    
                if (!invitation) {
                    return res.status(400).send('Invalid invitation token');
                }
                
                const newUser = await Customers.create({
                    companyId: invitation.companyId,
                    email: invitation.email,
                    uname,
                    password,
                    role: "guide"
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