const { body }  = require("express-validator"); 
 
module.exports = registerValidation = [ 
    body("uname") 
        .isLength({min: 3}) 
        .withMessage("Username must be 3 character at least") 
        .isAlpha() 
        .withMessage("Username must consist only letter"), 

    body("email").isEmail().withMessage("Write correct email address"), 

    body("password") 
        .isLength({min:8}) 
        .withMessage("Password must be 8 character at least") 
        .isAlphanumeric() 
        .withMessage("The password must consist only alphanumeric"), 

    body("passwordConfirm").custom((value, {req}) => { 
        if(value != req.body.password){ 
            throw new Error('Password confirmation does not match password'); 
        } 
        return true; 
    }) 
]