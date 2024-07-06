const { validationResult } = require("express-validator")
const {Users} = require("../../models")
const FileUpload = require("../../services/fileUploadService.js")

class Profile{

    static async getProfileInfo(req, res){
        const id = {id: 1} // {id: req.session.user_id} //UPDATE THIS IN PROD ENV
        const user  = await Users.findOne({where: id})

        return res.render("./profile/profile", {layout: 'layouts/pagesheader.ejs', errors: {}, profile: user, type: 'user' });
    }

    static async uploadProfilePhoto(req, res){
        const errors = validationResult(req);
        const id = { id: 1 }// req.session.user_id  // UPDATE THIS IN PROD ENV
        
        try {
            if(errors.isEmpty()){ 
                const profile = await Users.findOne({where: id});
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
                console.log(errorObject)
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

            const user = await Users.findOne({where: id})

            if(user){
                user.email = email
                await user.save()
            }
            return res.redirect('/user/profile')
        }else{
            const errorObject = errors.array().reduce((acc, error) => {
                acc[error.path] = error.msg;
                return acc;
            }, {})
            return res.json(errorObject)
        }
    }

    static async updateNumber(req, res){
        const errors = validationResult(req)
        
        if(errors.isEmpty()){
            const {number} = req.body;
            const id = 1; // req.session.user_id //UPDATE THIS IN PROD ENV

            const user = await Users.findOne({where: id})

            if(user){
                user.number = number
                await user.save()
            }
            return res.redirect('/user/profile')
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

            const user = await Users.findOne({where: {id, password:currentPass}})

            if(user){
                user.password = newPass1
                await user.save()
            }
            return res.redirect('/user/profile')
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
            const user = await Users.findOne({where: {id}})

            if(user){
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
                        user[key] = data[key];
                    }
                });

                await user.save();
            }
            return res.redirect('/user/profile')
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