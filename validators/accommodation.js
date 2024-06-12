const { body, check }  = require("express-validator"); 

const allowedValues = ['Pet Allowed', 'No Smoking'];

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
        .isLength({min: 3, max: 50}) 
        .withMessage("Title must consist of min 3 and max 50 characters") 
        .escape(),
    
    body("location") 
        .isLength({min: 3, max: 100}) 
        .withMessage("Location must consist of min 3 and max 100 characters") 
        .matches(/^[A-Za-z0-9\- ]+$/)
        .withMessage('Location must contain only letters, numbers, dashes, and spaces.')
        .trim()
        .escape(),

    body("price")
        .isLength({max:10})
        .isNumeric()
        .withMessage("Price must consist only numbers"),

    body('currency').isIn(['AZN', 'USD', 'EUR']).withMessage('Currency must be either "AZN", "USD" or "EUR"'),

    body("in")
        .exists()
        .withMessage('Check-in time is required')
        .matches(/^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/)
        .withMessage('Invalid time format. Use HH:MM AM/PM'),
    
    body('out')
        .exists()
        .withMessage('Check-out time is required')
        .matches(/^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/)
        .withMessage('Invalid time format. Use HH:MM AM/PM'),
    
    body("amenities")
        .isLength({min: 1, max: 950})
        .withMessage("Amenities must consist of letters"),
    
    body("roomCount")
        .isLength({max:4})
        .isNumeric()
        .withMessage("Room count must consist only numbers"),
    
    body("bedCount")
        .isLength({max:4})
        .isNumeric()
        .withMessage("Bed count must consist only numbers"),

    body("bathCount")
        .isLength({max:4})
        .isNumeric()
        .withMessage("Bathroom count must consist only numbers"),

    body("rules")
        .isLength({min: 1, max: 200})
        .withMessage("Rules must consist of letters"),

    body("guestCount")
        .isLength({max:4})
        .isNumeric()
        .withMessage("Guest count must consist only numbers"),

    body("roomType").isIn(['Entire Home', 'Private Room']).withMessage('Room type must be only "specified options"'),
    
    body("promotions")
        .isLength({max:4})
        .isNumeric()
        .withMessage("Promotions must consist only numbers"),

    body("about")
        .isLength({min: 20, max: 500}) 
        .withMessage("About must be min 20 and max 500 character") 
        .escape(),
]