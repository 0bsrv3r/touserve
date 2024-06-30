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
}

module.exports = Profile