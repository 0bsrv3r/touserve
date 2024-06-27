const {check }  = require("express-validator"); 

module.exports = profilePhotoValidation = [
    check("image") 
        .custom((value, {req}) => { 
            if(!req?.files?.photo){ 
                return true
            } 

            const profileImage = req.files.photo
            const allowedMimeTypes = ["image/png","image/jpeg","image/gif"] 
            const allowedExtensions = ["png", "jpeg", "jpg", "gif"] 

            if(!allowedMimeTypes.includes(profileImage.mimetype)){ 
                throw new Error("Only .png, .jpeg, .gif file type allowed") 
            } 
            if(!allowedExtensions.includes(profileImage.name.split('.').pop())){ 
                throw new Error("Only .png, .jpeg, .gif file type allowed") 
            } 
            if(profileImage.size > 5 * 1024 * 1024){ 
                throw new Error("File size must not be more then 5mb") 
            } 
            if(profileImage.name.length > 100){ 
                throw new Error("File name length is more than 100 character") 
            } 
            return true; 
        }),
]