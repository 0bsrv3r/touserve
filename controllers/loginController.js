const  { validationResult } = require("express-validator") 
const User = require('../models/user.js'); 
 
module.exports = postRegister = (req, res) => { 
    
    const errors = validationResult(req); 
    
    if(errors.isEmpty()){ 
        
        // model structure 
        const data = { 
            uname: req.body.uname, 
            email: req.body.email, 
            password: req.body.password,
            role: req.body.role
        } 

        const insertedData = User.create(data) 
        // const user = User.findById(insertedData.insertId) 
        // req.session.username = user.name 
        // req.session.user_id = user.id 
        res.redirect('/') 
    }else{
        const errorObject = errors.array().reduce((acc, error) => {
            acc[error.path] = error.msg;
            return acc;
        }, {})

        res.render('register',{ errors: errorObject, layout: false }) 
    }
}