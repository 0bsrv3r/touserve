const { body, check }  = require("express-validator"); 

module.exports = eventValidation = [
    check("image") 
        .custom((value, {req}) => { 
            if(!req?.files?.images){ 
                return true
            } 
            const allowedMimeTypes = ["image/png","image/jpeg","image/gif"] 
            const allowedExtensions = ["png", "jpeg", "jpg", "gif"] 
            const images = req.files.images
           
            if (images.length < 3 || images.length == undefined) {
                throw new Error("At least 3 images must be uploaded");
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
    
    body("tourType") 
        .optional({ checkFalsy: true })
        .isLength({ max: 100 })
        .withMessage('Tour Type must be a maximum of 100 characters')
        .isAlpha()
        .withMessage('Area can only contain letters')
        .trim(),
    
    body('category')
        .isIn(['culture-art', 'beauty-health', 'entertainment', 'offroad', 'hunting'])
        .withMessage('Category must be only "specified options'),
    
    body("guide")
        .isLength({max:4}) 
        .isNumeric()
        .withMessage("Guide must consist only numbers"),
    
    body("country")
        .notEmpty()
        .withMessage("County must not be empty")
        .isLength({max: 70}) 
        .withMessage("Country must be max 70 characters") 
        .escape(),
    
    body("city")
        .notEmpty()
        .withMessage("City must not be empty")
        .isLength({max: 70}) 
        .withMessage("City must be max 70 characters") 
        .escape(),

    body("area") 
        .optional({ checkFalsy: true }) // Allows empty fields to pass
        .isLength({ max: 70 })
        .withMessage('Area must be a maximum of 70 characters')
        .matches(/^[A-Za-z0-9,.\- ]+$/)
        .withMessage('Area can only contain letters, numbers, some special characters')
        .trim(),

    body("date")
        .optional({ checkFalsy: true })
        .matches(/^(0[1-9]|1[1-9])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/)
        .withMessage('Invalid date format. Use MM/DD/YYYY'),
    
    body('time')
        .exists()
        .withMessage('Time is required')
        .matches(/^((0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM))|(([01]?[0-9]|2[0-3]):[0-5][0-9])$/)
        .withMessage('Invalid time format. Use HH:MM'),
    
    body("duration")
        .isLength({max:4})
        .isNumeric()
        .withMessage("Duration must consist only numbers"),
    
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

    body('currency').isIn(['₼', '$', '€']).withMessage('Currency must be either "AZN", "USD" or "EUR"'),
]