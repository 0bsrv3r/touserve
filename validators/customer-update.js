const { body }  = require("express-validator"); 

module.exports = customerValidation = [
    body("uname") 
        .optional({ checkFalsy: true })
        .isLength({min: 3, max:70}) 
        .withMessage("Username must be 3 character at least") 
        .isAlpha() 
        .withMessage("Username must consist only letter"), 

    body("email")
        .optional({ checkFalsy: true })
        .isEmail()
        .withMessage("Invalid email address"),
    
    body("number")
        .optional({ checkFalsy: true })
        .isMobilePhone()
        .withMessage("Invalid phone numbers"),

    body("newPass1") 
        .optional({ checkFalsy: true })
        .isLength({min:8}) 
        .withMessage("Password must be 8 character at least")
        .isLength({max:70}) 
        .withMessage("Password must be 50 character max") 
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=;'/\\[\]~`])[A-Za-z\d!@#$%^&*(),.?":{}|<>_\-+=;'/\\[\]~`]+$/)
        .withMessage('Password must contain letters, numbers, and special characters'),

    body("newPass2")
        .optional({ checkFalsy: true })
        .custom((value, {req}) => { 
            if(value != req.body.newPass1){ 
                throw new Error('Password confirmation does not match password'); 
            } 
            return true; 
        }),

    body("firstName") 
        .optional({ checkFalsy: true })
        .isLength({min: 3, max: 70}) 
        .withMessage("Name must consist of min 3 and max 50 characters") 
        .isAlpha()
        .withMessage("Name must consist only letters"), 

    body("lastName") 
        .optional({ checkFalsy: true })
        .isLength({min: 3, max: 70}) 
        .withMessage("Surname must consist of min 3 and max 70 characters") 
        .isAlpha()
        .withMessage("Surname must consist only letters"), 
    
    body("country")
        .optional({ checkFalsy: true })
        .notEmpty()
        .withMessage("County must not be empty")
        .isLength({max: 70}) 
        .withMessage("Country must be max 70 characters") 
        .escape(),
    
    body("city")
        .optional({ checkFalsy: true })
        .notEmpty()
        .withMessage("City must not be empty")
        .isLength({max: 70}) 
        .withMessage("City must be max 70 characters") 
        .escape(),
    
    body("languages")
        .optional({ checkFalsy: true })
        .isLength({min: 2, max: 100}) 
        .withMessage("Languages must consist of min 2 and max 100 characters") 
        .escape(),
    
    body("age")
        .optional({ checkFalsy: true })
        .isLength({min: 1, max: 3})
        .isNumeric() 
        .withMessage("Age must consist of numbers"),
    
    body("experience")
        .optional({ checkFalsy: true })
        .isLength({min: 1, max: 5})
        .isNumeric() 
        .withMessage("Description must consist of numbers"),
    
    body("description")
        .optional({ checkFalsy: true })
        .isLength({min: 20, max: 500}) 
        .withMessage("Description must consist of min 20 and max 2000 characters") 
        .escape()
]