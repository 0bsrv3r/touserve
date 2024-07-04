const { validationResult } = require("express-validator")
const {Customers} = require("../../models/index.js")
const FileUpload = require("../../services/fileUploadService.js")

class Profile{

    static async getProfileInfo(req, res){
        const id = {id: 1} // {id: req.session.user_id} //UPDATE THIS IN PROD ENV
        const customer  = await Customers.findOne({where: id, include:["companyTours", "accommodations", "companyGuides"]})
        const role = customer.role

        return res.render("./profile/profile", {layout: 'layouts/pagesheader.ejs', errors: {}, profile: customer, type: 'customer', role:role });
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
                return res.render("./profile/profile", {layout: 'layouts/pagesheader', errors: errorObject});                  
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
                customer.email = email
                customer.save()
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

            const customer = await Customers.findOne({where: {id, password:currentPass}})

            if(customer){
                customer.password = newPass1
                customer.save()
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