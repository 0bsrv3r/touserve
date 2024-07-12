const { validationResult } = require("express-validator")
const {Customers} = require("../../models/index.js")
const FileUpload = require("../../services/fileUploadService.js")
const JWTService = require("./../../services/jwtService.js")
const EmailSender = require("./../../services/emailService.js")

class Profile{

    static async getProfileInfo(req, res){
        const id = {id: 1} // {id: req.session.user_id} //UPDATE THIS IN PROD ENV
        const customer  = await Customers.findOne({where: id, include:["companyTours", "accommodations", "companyGuides"]})
        const role = customer.role

        return res.render("./profile/profile", {layout: 'layouts/pagesheader.ejs', errors: {}, profile: customer, type: 'customer', role:role, active:"profile"});
    }

    static async uploadProfilePhoto(req, res){
        const errors = validationResult(req);
        const id = { id: 1 }// req.session.user_id  // UPDATE THIS IN PROD ENV
        
        try {
            if(errors.isEmpty()){ 
                const profile = await Customers.findOne({where: id});
                let oldImage  = profile.image 
               
                if (req?.files?.photo) {
                    // Remove Old Image
                    await FileUpload.singleFileDelete(req, res, oldImage)

                    // Upload New Image
                    const image = await FileUpload.singleFileUpload(req, res, req.files.photo, "upload/photos/profile/")
                    profile.image = image;                        
                }

                return await profile.save();
            }else{
                const errorObject = errors.array().reduce((acc, error) => {
                    acc[error.path] = error.msg;
                    return acc;
                }, {})
                return res.render("./profile/profile", {layout: 'layouts/pagesheader', errors: errorObject, active:"profile"});                  
            }
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while updating the profile photo' });
        }
        
    }

    static async updateEmail(req, res){
        const errors = validationResult(req)
        
        if(errors.isEmpty()){
            const {email} = req.body;
            const id = 1; // req.session.user_id //UPDATE THIS IN PROD ENV
            const customer = await Customers.findOne({where: id})

            if(customer){
                const token  = await JWTService.generateToken(email, id)
                const invitationLink = `http://localhost:8181/customer/verify/email?token=${token}`; //UPDATE THIS IN PROD ENV
                await EmailSender.sendEmail(email, invitationLink)
            }
            return res.redirect('/customer/profile')
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})
            return res.json(errorObject)
        }
    }

    static async verifyEmail(req, res){
        const {token} = req.query
        const decoded = await JWTService.verifyToken(token)
        const newEmail = await Customers.findOne({where: {email:decoded.email}})
        const customer = await Customers.findOne({where: {id:decoded.id}})

        if(customer && !newEmail){
            customer.email = decoded.email
            await customer.save()

            req.session.username = customer.uname 
            req.session.user_id = customer.id
            req.session.user_type = "customer"

            return res.redirect("/customer/profile")
        }

        return res.redirect("/customer/profile")
    }

    static async updateNumber(req, res){
        const errors = validationResult(req)
        
        if(errors.isEmpty()){
            const {number} = req.body;
            const id = 1; // req.session.user_id //UPDATE THIS IN PROD ENV

            const customer = await Customers.findOne({where: id})

            if(customer){
                customer.number = number
                await customer.save()
            }
            return res.redirect('/customer/profile')
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})
            return res.json(errorObject)
        }
    }

    static async updatePassword(req, res){
        const errors = validationResult(req)
        
        if(errors.isEmpty()){
            const {currentPass, newPass1} = req.body
            const id = 1 //req.session.user_id //UPDATE THIS IN PROD ENV

            const customer = await Customers.findOne({where: {id}})
            const isValidPassword = await customer.validPassword(currentPass)

            if(customer && isValidPassword){
                customer.password = newPass1
                await customer.save()
            }
            return res.redirect('/customer/profile')
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})

            return res.json(errorObject)
        }    
    }

    static async updateGeneral(req, res){
        const errors = validationResult(req)
        
        if(errors.isEmpty()){
            const id = 1 //req.session.user_id //UPDATE THIS IN PROD ENV
            const customer = await Customers.findOne({where: {id}})

            if(customer){
                const data = {
                   firstName: req.body.firstName, 
                   lastName: req.body.lastName,
                   age: req.body.age,
                   experience: req.body.experience, 
                   languages: req.body.languages, 
                   description: req.body.description
                }

                Object.keys(data).forEach(key => {
                    if (data[key]) {
                        customer[key] = data[key];
                    }
                });

                await customer.save();
            }
            return res.redirect('/customer/profile')
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})

            return res.json(errorObject)
        }    
    }
}

module.exports = Profile