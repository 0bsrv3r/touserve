const { body }  = require("express-validator"); 
 
module.exports = reviewValidation = [
    body("review")
        .isLength({max: 500}) 
        .withMessage("Review must be max 500 character") 
        .escape(),
    
    body('stars').isInt({ min: 1, max: 5 }).withMessage('Stars must be an integer between 1 and 5')
]