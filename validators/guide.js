const { body, check }  = require("express-validator"); 

module.exports = eventValidation = [
    check("image") 
        .custom((value, {req}) => { 
            if(!req?.files?.image){ 
                throw new Error("Image not uploaded") 
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
                throw new Error("Certificate not uploaded") 
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
        .isLength({min: 3, max: 50}) 
        .withMessage("Name must consist of min 3 and max 50 characters") 
        .isAlpha()
        .withMessage("Name must consist only letters"), 

    body("surname") 
        .isLength({min: 3, max: 70}) 
        .withMessage("Surname must consist of min 3 and max 70 characters") 
        .isAlpha()
        .withMessage("Surname must consist only letters"), 
    
    body("location") 
        .isLength({min: 3, max: 150}) 
        .withMessage("Location must consist of min 3 and max 150 characters") 
        .matches(/^[A-Za-z0-9\- ]+$/)
        .withMessage('Location must contain only letters, numbers, dashes, and spaces.')
        .trim()
        .escape(),

    body("languages")
        .isLength({min: 2, max: 100}) 
        .withMessage("Languages must consist of min 2 and max 100 characters") 
        .escape(),
    
    body('visa').isIn(['Yes', 'No']).withMessage('Visa must be either "Yes" or "No"'),
    body('currency').isIn(['AZN', 'USD', 'EUR']).withMessage('Currency must be either "AZN", "USD" or "EUR"')
    
]