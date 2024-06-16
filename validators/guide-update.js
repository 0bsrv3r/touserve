const { body, check }  = require("express-validator"); 

module.exports = eventValidation = [
    check("image") 
        .custom((value, {req}) => { 
            if(!req?.files?.image){ 
                return true
            } 
            const allowedMimeTypes = ["image/png","image/jpeg","image/gif"] 
            const allowedExtensions = ["png", "jpeg", "jpg", "gif"] 
            const profileImage = req.files.image 
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

    check("certificate") 
        .custom((value, {req}) => { 
            if(!req?.files?.certificate){ 
                return true
            } 
            const allowedMimeTypes = ["image/png","image/jpeg","image/gif"] 
            const allowedExtensions = ["png", "jpeg", "jpg", "gif"] 
            const profileImage = req.files.certificate 
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

    body("name") 
        .isLength({min: 3, max: 70}) 
        .withMessage("Name must consist of min 3 and max 50 characters") 
        .isAlpha()
        .withMessage("Name must consist only letters"), 

    body("surname") 
        .isLength({min: 3, max: 70}) 
        .withMessage("Surname must consist of min 3 and max 70 characters") 
        .isAlpha()
        .withMessage("Surname must consist only letters"), 
    
    body("country")
        .notEmpty()
        .withMessage("County must not be empty")
        .isLength({max: 70}) 
        .withMessage("Country must be max 100 characters") 
        .escape(),
    
    body("city")
        .notEmpty()
        .withMessage("City must not be empty")
        .isLength({max: 70}) 
        .withMessage("City must be max 100 characters") 
        .escape(),

    body("languages")
        .isLength({min: 2, max: 100}) 
        .withMessage("Languages must consist of min 2 and max 100 characters") 
        .escape(),
    
    body("age")
        .isLength({min: 1, max: 3})
        .isNumeric() 
        .withMessage("Age must consist of numbers"),
    
    body("experience")
        .isLength({min: 1, max: 5})
        .isNumeric() 
        .withMessage("Description must consist of numbers"),
    
    body('gender').isIn(['Male', 'Female']).withMessage('Gender must be either "male" or "female"'),
    
    body("description")
        .isLength({min: 20, max: 500}) 
        .withMessage("Description must consist of min 20 and max 2000 characters") 
        .escape()
]