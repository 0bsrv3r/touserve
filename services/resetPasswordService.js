const {Invitations} = require('../models'); 
const JWTService = require("./../services/jwtService.js");
const EmailSender = require("./../services/emailService.js");


class ResetPassword{

    static async accountRecovery(req, res, email, Model, user_type){
        const user = await Model.findOne({where: {email:email}})
        const invitation = await Invitations.findOne({where: {email}})

        try{         
            if(user){
                let token = await JWTService.generateToken(user.email, user.id)
                const emailLink = `http://localhost:8181/auth/${user_type}/reset-password?token=${token}` // Prod
                await EmailSender.sendEmail(user.email, emailLink)
            }

            if(invitation){
                invitation.token = token
                await invitation.save();
            }else{
                await Invitations.create({ email: email, token:token, status:"pending" });
            }
        }catch(error){
            return res.status(500).send(error);
        }
    }

    static async verifyToken(req, res, token, type){
        try {
            const decoded = await JWTService.verifyToken(token);
            const invitation = await Invitations.findOne({ where: { token:token } });

            if (!invitation && decoded) {
                return res.status(400).send('Invalid invitation token');
            }else{
                return res.render('reset-password', {layout: "layouts/pagesheader", token: token, type:type, active:""});
            }
        } catch (error) {
            return res.status(400).send('Invalid or expired token');
        }
    }

    static async resetPassword(req, res, Model, password, token){

        try {
            const decoded = await JWTService.verifyToken(token);
            const invitation = await Invitations.findOne({ where: { token:token } });
            
            if (!invitation && decoded) {
                return res.status(400).send('Invalid invitation token');
            }
            
            const user = await Model.findOne({where: {email: decoded.email}});
            user.password = password
            user.save()

            // Remove Invitation
            await Invitations.destroy({ where: { token:token } });

        } catch (error) {
            res.status(400).send('Invalid or expired token');
        }
    }
}

module.exports = ResetPassword