const { body, check }  = require("express-validator"); 

const allowedValues = ['Pet Allowed', 'No Smoking'];

module.exports = eventValidation = [
    check("image") 
        .custom((value, {req}) => { 
            if(!req?.files?.images){ 
                return true
            } 
          
            const images = req.files.images
            const allowedMimeTypes = ["image/png","image/jpeg","image/gif"] 
            const allowedExtensions = ["png", "jpeg", "jpg", "gif"] 

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
        .isLength({min: 3, max: 50}) 
        .withMessage("Title must consist of min 3 and max 50 characters") 
        .escape(),

    body("accommodationType").isIn(['Home', 'Apartment']).withMessage('Accommodation type must be only "specified options"'),

    body("in")
        .exists()
        .withMessage('Check-in time is required')
        .matches(/^((0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM))|(([01]?[0-9]|2[0-3]):[0-5][0-9])$/)
        .withMessage('Invalid time format. Use HH:MM'),
    
    body('out')
        .exists()
        .withMessage('Check-out time is required')
        .matches(/^((0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM))|(([01]?[0-9]|2[0-3]):[0-5][0-9])$/)
        .withMessage('Invalid time format. Use HH:MM'),
    
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

    body("street") 
        .optional({ checkFalsy: true }) // Allows empty fields to pass
        .isLength({ max: 70 })
        .withMessage('Area must be a maximum of 70 characters')
        .matches(/^[A-Za-z0-9,.\- ]+$/)
        .withMessage('Area can only contain letters, numbers, some special characters')
        .trim(),

    body("price")
        .isLength({max:10})
        .isNumeric()
        .withMessage("Price must consist only numbers"),

    body('currency').isIn(['₼', '$', '€']).withMessage('Currency must be either "AZN", "USD" or "EUR"'),

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
    
    body("guestCount")
        .isLength({max:4})
        .isNumeric()
        .withMessage("Guest count must consist only numbers"),

    body("roomType").isIn(['Entire Home', 'Private Room']).withMessage('Room type must be only "specified options"'),

    body("rules")
        .optional({ checkFalsy: true })
        .isLength({min: 1, max: 200})
        .withMessage("Rules must consist of letters"),
    
    body("promotions")
        .optional({ checkFalsy: true })
        .isLength({max:4})
        .isNumeric()
        .withMessage("Promotions must consist only numbers"),
    
    body("weeklyDiscount")
        .optional({ checkFalsy: true })
        .isLength({max:4})
        .isNumeric()
        .withMessage("Promotions must consist only numbers"),

    body("monthlyDiscount")
        .optional({ checkFalsy: true })
        .isLength({max:4})
        .isNumeric()
        .withMessage("Promotions must consist only numbers"),

    body("about")
        .isLength({min: 20, max: 500}) 
        .withMessage("About must be min 20 and max 500 character") 
        .escape(),
]