const { body, check }  = require("express-validator"); 

module.exports = eventValidation = [
    check("image") 
        .custom((value, {req}) => { 
            if(!req?.files?.images){ 
                throw new Error("Image not uploaded") 
            } 
            const allowedMimeTypes = ["image/png","image/jpeg","image/gif"] 
            const allowedExtensions = ["png", "jpeg", "jpg", "gif"] 
            const images = req.files.images

            if (!Array.isArray(images)) {
                if(!allowedMimeTypes.includes(images.mimetype)){ 
                    throw new Error("Only .png, .jpeg, .gif file type allowed") 
                } 
                if(!allowedExtensions.includes(images.name.split('.').pop())){ 
                    throw new Error("Only .png, .jpeg, .gif file type allowed") 
                } 
                if(images.size > 5 * 1024 * 1024){ 
                    throw new Error("File size must not be more then 5mb") 
                } 
                if(images.name.length > 100){ 
                    throw new Error("File name length is more than 100 character") 
                }
            }else{
                images.forEach((image) => {
                    if (!allowedMimeTypes.includes(image.mimetype)) {
                        throw new Error("Only .png, .jpeg, .gif file type allowed");
                    }
                    if (!allowedExtensions.includes(image.name.split('.').pop())) {
                        throw new Error("Only .png, .jpeg, .gif file type allowed");
                    }
                    if (image.size > 5 * 1024 * 1024) {
                        throw new Error("File size must not be more than 5MB");
                    }
                    if (image.name.length > 100) {
                        throw new Error("File name length is more than 100 characters");
                    }
                });
            }
            return true; 
        }),

    body("title") 
        .isLength({min: 3, max: 150}) 
        .withMessage("Title must consist of min 3 and max 150 characters") 
        .escape(),
    
    body('category')
        .isIn(['culture-art', 'beauty-health', 'entertainment', 'offroad', 'hunting'])
        .withMessage('Category must be only "specified options'),
    
    body("guide") 
        .isNumeric()
        .withMessage("Guide must consist only numbers"),

    body("guide") 
        .isNumeric()
        .withMessage("Guide must consist only numbers"), 
    
    body("location") 
        .isLength({min: 3, max: 150}) 
        .withMessage("Location must consist of min 3 and max 150 characters") 
        .matches(/^[A-Za-z0-9\- ]+$/)
        .withMessage('Location must contain only letters, numbers, dashes, and spaces.')
        .trim()
        .escape(),

    body("date")
        .exists()
        .withMessage('Date is required')
        .matches(/^(0[1-9]|1[1-9])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/)
        .withMessage('Invalid date-time format. Use MM/DD/YYYY & HH:MM AM/PM1'),
    
    body('time')
        .exists()
        .withMessage('Time is required')
        .matches(/^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/)
        .withMessage('Invalid date-time format. Use MM/DD/YYYY & HH:MM AM/PM2'),
    
    body("duration")
        .isNumeric()
        .withMessage("Duration must consist only numbers"),
    
    body("highlights")
        .isLength({min: 1, max: 300})
        .isAlpha() 
        .withMessage("Highlights must consist of letter"),
    
    body("inclusions")
        .isLength({min: 1, max: 300})
        .isAlpha() 
        .withMessage("Inclusions must consist of letters"),
    
    body("overview")
        .isLength({min: 20, max: 2000}) 
        .withMessage("Overview must be min 20 and max 2000 character") 
        .escape(),
    
    body("additional")
        .isLength({max: 2000}) 
        .withMessage("Additional Info must be max 2000 character") 
        .escape(),

    body("price")
        .isLength({max:10})
        .isNumeric()
        .withMessage("Price must consist only numbers"),

    body('currency').isIn(['AZN', 'USD', 'EUR']).withMessage('Currency must be either "AZN", "USD" or "EUR"'),
]