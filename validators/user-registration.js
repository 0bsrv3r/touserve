const { body }  = require("express-validator"); 
 
module.exports = registerValidation = [ 
    body("uname") 
        .isLength({min: 3, max:70}) 
        .withMessage("Username must be 3 character at least") 
        .isAlpha() 
        .withMessage("Username must consist only letter"), 

    body("email").isEmail().withMessage("Write correct email address"), 

    body("password") 
        .isLength({min:8}) 
        .withMessage("Password must be 8 character at least")
        .isLength({max:70}) 
        .withMessage("Password must be 50 character max") 
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=;'/\\[\]~`])[A-Za-z\d!@#$%^&*(),.?":{}|<>_\-+=;'/\\[\]~`]+$/)
        .withMessage('Password must contain letters, numbers, and special characters'),

    body("passwordConfirm").custom((value, {req}) => { 
        if(value != req.body.password){ 
            throw new Error('Password confirmation does not match password'); 
        } 
        return true; 
    })
]