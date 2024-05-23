const { body, check }  = require("express-validator"); 

const dateRegex = /^\d{2}\/\d{2}\/\d{4} \d{1,2}:\d{2} [APM]{2} - \d{2}\/\d{2}\/\d{4} \d{1,2}:\d{2} [APM]{2}$/;
 
module.exports = eventValidation = [
    check("image") 
        .custom((value, {req}) => { 
            if(!req?.files?.image){ 
                throw new Error("Image not uploaded") 
            } 
            const allowedMimeTypes = ["image/png","image/jpeg","image/gif"] 
            const allowedExtensions = ["png", "jpeg", "jpg", "gif"] 
            const profileImage = req.files.avatar 
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

    body("title") 
        .isLength({max: 150}) 
        .withMessage("Title must be 150 character at least") 
        .isAlpha() 
        .withMessage("Title must consist only letter"), 
    
    body("location") 
        .isLength({max: 150}) 
        .withMessage("Location must be 150 character at least") 
        .isAlphanumeric() 
        .withMessage("Location must consist only letters and numbers"), 

    body("description") 
        .isAlpha() 
        .withMessage("Description must consist only letter"), 
    
    body("date")
        .matches(dateRegex)
        .withMessage('Date must be in the format MM/DD/YYYY h:mm A - MM/DD/YYYY h:mm A') 
    
]